import { configureStore } from './store'
import rootSaga from '../app/core/saga'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
const middlewares = [
  sagaMiddleware,
]
const mockStore = configureStore(middlewares)

global.getStore = state => {
  const store = mockStore(state)
  sagaMiddleware.run(rootSaga)
  return store
}
