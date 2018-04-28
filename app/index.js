import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './core/store'
import Router from './core/router'
import { AppContainer } from 'react-hot-loader'
import './styles/index.less'
const store = configureStore()

const renderApp = Router => {
  const Root = function() {
    return (
      <AppContainer>
        <Provider store={store}>
          <Router />
        </Provider>
      </AppContainer>
    )
  }

  ReactDom.render(<Root />, document.getElementById('app'))
}

renderApp(Router)

if (module.hot) {
  module.hot.accept([
    './core/router',
  ])
}
