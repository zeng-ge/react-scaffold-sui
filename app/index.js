import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './core/store'
import Entry from './features/app/containers/Entry'
import Router from './core/router'
import { getDomain } from './utils/cookie'
import './styles/index.less'
const store = configureStore()

class App {
  constructor() {
    this.element = document.getElementById('app')

    this.init()
  }

  init() {
    this.initCookieDomain()
    this.initCloseHandler()
  }

  /**
   * 设置cookie的domain,以处理跨域问题
   *
   * 内外站点domain保持一致，为了让iframe下的此站点和iframe之外的站点的通信，
   * 比如: 通过window.top.User访问用户信息
   * 再比如: 通过top.closeAllReactUrl()关闭当前项目，并返回到主项目
   * 当cookie值为undefined的时候，document.domain赋值会报错，该场景仅可能在我们自己搭建的CI的站点上出现。
   */
  initCookieDomain() {
    document.domain = getDomain()
  }
  /**
   * 处理关闭iframe时top.closeAllReactUrl()方法产生的报错，与当前项目业务逻辑无关
   */
  initCloseHandler() {
    window.needUnmountReactComponentMethodList = []
    window.needUnmountReactComponentMethodList.push(function() {
      ReactDom.unmountComponentAtNode(document.getElementById('app'))
    })
  }

  getRenderComponent() {
    return (
      <Provider store={store}>
        <Entry>
          <Router />
        </Entry>
      </Provider>
    )
  }

  render() {
    const AppComponent = this.getRenderComponent()
    ReactDom.render(AppComponent, this.element)
  }

}

new App().render()
