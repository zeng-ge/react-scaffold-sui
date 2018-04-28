import { take, put } from 'redux-saga/effects'
import actions from './actions'

export function* userSaga() {
  yield take(actions.fetchUser())
  // yield call()
  yield put(actions.saveUser())
}
