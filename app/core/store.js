import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducer'
import rootSaga from './saga'

const rootReducer = combineReducers(reducers)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [
  sagaMiddleware,
]

const configureStore = function() {
  let store = null
  const reduxTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  store = createStore(rootReducer, reduxTools(applyMiddleware(...middlewares)))

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
