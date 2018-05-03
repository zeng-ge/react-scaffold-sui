import { createReducer } from '../reducer'

describe('createReducer', () => {
  test('createReducer should update state', () => {
    const initialState = {
      user: {},
    }
    const actions = {
      updateUser: function(state, action) {
        state.user = action.user
        return state
      },
    }
    const reducer = createReducer(actions, initialState)
    const action = { type: 'updateUser', payload: { user: { name: 'sky' }}}
    expect(reducer(undefined, action)).toEqual({ user: { name: 'sky' }})
  })

  test('createReducer should return old state', () => {
    const initialState = {
      user: {},
    }
    const actions = {
      updateUser: function(state, action) {
        state.user = action.user
        return state
      },
    }
    const reducer = createReducer(actions, initialState)
    const action = { type: 'saveUser', payload: { user: { name: 'sky' }}}
    expect(reducer(undefined, action)).toEqual({ user: {}})
  })

  test('createReducer should update assigned state', () => {
    const initialState = {
      user: {},
    }
    const state = {
      user: {},
      app: {},
    }
    const actions = {
      updateUser: function(state, action) {
        state.user = action.user
        return state
      },
    }
    const reducer = createReducer(actions, initialState)
    const action = { type: 'updateUser', payload: { user: { name: 'sky' }}}
    expect(reducer(state, action)).toEqual({
      user: { name: 'sky' },
      app: {},
    })
  })
})
