import actions from '../actions'

describe('app/actions', () => {
  test('actions.saveUser', () => {
    expect(actions.saveUser({ name: 'sky' })).toEqual(
      {
        type: 'saveUser',
        payload: {
          user: { name: 'sky' },
        },
      }
    )
  })

  test('actions.eventTracking', () => {
    expect(actions.eventTracking('module', 'action')).toEqual(
      {
        type: 'eventTracking',
        payload: {
          module: 'module',
          action: 'action',
        },
      }
    )
  })
})
