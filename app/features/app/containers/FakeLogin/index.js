import React, { Component } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Viewport from 'components/Viewport'
@connect(
  state => ({
    user: state.app.user,
  })
)
export default class FakeLogin extends Component {

  static propTypes = {
    user: object,
  }

  isLogin() {
    const { user } = this.props
    return !_.isEmpty(user)
  }

  renderStatue() {
    const isLogined = this.isLogin()
    return (
      <div>
        {
          isLogined
            ? (<a href="/home">己登录, 去首页</a>)
            : (<span>未登录</span>)
        }
      </div>
    )
  }
  render() {
    return (
      <Viewport>
        <div>
          {
            this.renderStatue()
          }
          <a href="http://lphomepad-dev.paas.cmbuat.com" target={'_blank'}>请点击此处模拟登录</a>
        </div>
      </Viewport>
    )
  }
}
