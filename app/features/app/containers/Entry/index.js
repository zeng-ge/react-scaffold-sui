import { Component } from 'react'
import { connect } from 'react-redux'
import { func, array, object, oneOfType } from 'prop-types'
import _ from 'lodash'
import actions from '../../actions'
import { getUserInfo } from '../../../../utils/cookie'
@connect(null, {
  saveUser: actions.saveUser,
})
export default class Entry extends Component {

  static propTypes = {
    saveUser: func,
    eventTracking: func,
    children: oneOfType([array, object]),
  }

  constructor(props) {
    super(props)
    const { saveUser } = props
    const userInfo = this.getUserInfo()
    if (!_.isEmpty(userInfo)) {
      saveUser(userInfo)
    }
  }

  /**
   * 如果没有从top拿到用户信息，则尝试从cookie里获取用户信息，此场景目前仅为dev和st环境的内网e2e测试准备。
   * 因为目前测试e2e可用的方案是：不从带iframe架构的入口处访问站点，而是直接输入dev或st环境的网址访问。
   */
  getUserInfo() {
    let userInfo = window.top && window.top.User
    if (!userInfo) {
      userInfo = getUserInfo()
    }
    return userInfo
  }

  render() {
    return this.props.children
  }
}
