import { all } from 'redux-saga'
import _ from 'lodash'
import registry from './registry'

const features = registry()
const sagas = _.reduce(features, (accumulator, feature) => {
  return _.concat(accumulator, feature.sagas || [])
}, [])

const rootSaga = function*() {
  const allEffects = _.map(sagas, saga => saga())
  yield all(allEffects)
}

export default rootSaga
