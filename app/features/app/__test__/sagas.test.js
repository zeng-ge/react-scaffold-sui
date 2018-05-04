import { call } from 'redux-saga/effects'
import { eventTrackingWorker } from '../sagas'
import actions from '../actions'
import { tracking } from 'services/eventTracking'

describe('app/sagas', () => {

  test('eventTrackingSaga', () => {
    const action = actions.eventTracking('module', 'action')
    const generator = eventTrackingWorker(action)
    expect(generator.next().value).toEqual(call(tracking, 'module', 'action'))
  })
})
