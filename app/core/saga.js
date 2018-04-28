import { all } from 'redux-saga/effects'
import _ from 'lodash'
import registry from './registry'

const features = registry()
const sagas = _.reduce(features, (accumulator, feature) => {
  return _.concat(accumulator, feature.sagas || [])
}, [])

const rootSaga = function*() {
  const allEffects = _
    .chain(sagas)
    .map(sagaMap => {
      return _.map(sagaMap, saga => saga())
    })
    .flatten()
    .value()

  yield all(allEffects)
}

export default rootSaga
