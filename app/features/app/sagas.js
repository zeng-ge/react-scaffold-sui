import { takeEvery, call } from 'redux-saga/effects'
import { tracking } from '../../services/eventTracking'
import actions from './actions'

function* eventTracking(action) {
  const { payload } = action
  try {
    yield call(tracking, payload.module, payload.action)
  } catch (e) {
    //eslint-disable-next-line
    console.log(e)
  }
}

/**
 * 每次dispatch actions.eventTracking时都会执行
 */
export function* eventTrackingSaga() {
  yield takeEvery(actions.eventTracking, eventTracking)

}
