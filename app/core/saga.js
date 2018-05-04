import { all } from 'redux-saga/effects'
import _ from 'lodash'
import registry from './registry'

const features = registry()
const sagas = _.reduce(features, (accumulator, feature) => {
  const featureSagas = feature.sagas || []
  const watchs = _.filter(featureSagas, (saga, key) => {
    return _.endsWith(key, 'Watcher')
  })
  return _.concat(accumulator, watchs)
}, [])

const rootSaga = function*() {
  const allEffects = _.map(sagas, saga => saga())

  yield all(allEffects)
}

export default rootSaga
