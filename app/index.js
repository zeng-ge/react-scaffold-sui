import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './core/store'
import Router from './core/router'

const store = configureStore()

const AppContainer = function() {
  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  )
}

ReactDom.render(<AppContainer />, document.getElementById('app'))
