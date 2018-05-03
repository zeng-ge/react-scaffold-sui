import reducer from '../reducer'

describe('app/reducer', () => {
  test('reducer.saveUser', () => {
    const action = { type: 'saveUser', payload: { user: { name: 'sky' }}}
    expect(reducer(null, action).user).toEqual({ name: 'sky' })
  })
})
