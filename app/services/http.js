import axios from 'axios'
import _ from 'lodash'
import { isContainKey } from '../utils'
import { APP_NAME } from 'constants'

//特殊参数的key
const specialPropNames = ['PLSPECUSER', 'PLRECOSEND', 'CTSECCON', 'CTSECRGE']
export default class Http {
  axios = null
  constructor(server, env = '') {
    this.server = server
    this.env = env
    this.axios = axios.create({
      baseURL: '/',
      timeout: 60000,
    })
  }
  /**
   * 工作条的输入参数是以数组的形式发送到后台的
   * @param {*} workbar
   * @param {*} parameters
   *
   * 参数结构:
   * [
   *  { FIRST_BRANCH_ID: 755 },
   *  [{ name:1 }, { name:2 }]
   * ]
   * 转化成
   * {
   *  CTXWDQSBX1: [{ FIRST_BRANCH_ID: 755 }]
   *  CTXWDQSBX2: [{ name:1 }, { name:2 }]
   * }
   */
  buildWorkdbarParameters(workbar, parameters) {
    const parameterLength = parameters.length
    return _.reduce(parameters, (accumulator, item, index) => {
      //如果最后一个参数是特殊参数（含分页，用户信息等）则直接将参数属性赋值
      const isLastParameter = index + 1 === parameterLength
      const isSpecialParam = isContainKey(item, specialPropNames)
      if (isLastParameter && isSpecialParam) {
        let specialItem = _.reduce(item, (itemAccumulator, value, key) => {
          //如果特殊参数的属性值是对象，则将其包在数组里；如果是数组，则不变
          itemAccumulator[key] = _.isArray(value) ? value : [value]
          return itemAccumulator
        }, {})
        return _.assign(accumulator, specialItem)
      } else {
        let propertyName = `${workbar}X${index + 1}`
        accumulator[propertyName] = _.isArray(item) ? item : [item]
        return accumulator
      }
    }, {})
  }

  /**
   *
   */
  buildRequestBody(server, workbar, parameters) {
    return {
      server: server,
      workBarId: workbar,
      infbdy: this.buildWorkdbarParameters(workbar, parameters),
      refer: location.href,
      appName: APP_NAME,
    }
  }

  parseInfoBody(body, workbar) {
    return _.chain(body)
      .keys()
      .filter( key => key.startsWith(workbar))
      .sort()
      .map( key => body[key])
      .value()
  }

  getPublicInterface(infoBody) {
    const publicInterface = {}
    if (infoBody.PLRECOSEND) {
      publicInterface.PLRECOSEND = infoBody.PLRECOSEND
    }
    if (infoBody.PLSPECUSER) {
      publicInterface.PLSPECUSER = infoBody.PLSPECUSER
    }
    return publicInterface
  }

  /**
   * 将原工作条的返回值转换为数组的形式，其中工作条返回值的参数顺序依次填充数组。
   *
   * response的结构,只用到INFBDY的数据
   * {
   *  INFBDY: {
   *    PLRECOSEND: [],//包含公共接口
   *    CTXWDMDSZ1: []
   *    CTXWDMDSZ2: []
   *  }
   * ...
   * }
   */
  buildResponse(response, workbar) {
    const infoBody = _.get(response, 'INFBDY', {})//当请求出错时，INFBDY字段不存在。
    const items = this.parseInfoBody(infoBody, workbar)

    //如果包含公共接口，它要作为items的第一项
    const publicInterface = this.getPublicInterface(infoBody)
    if (!_.isEmpty(publicInterface)) {
      items.unshift(publicInterface)
    }
    return items
  }

  send = async (workbar, ...parameters) => {
    const body = this.buildRequestBody(this.server, workbar, parameters)
    const response = await this.axios.post(`${this.env}/PaasClientServletForJson`, body)
    return this.buildResponse(response.data, workbar)
  }

}
