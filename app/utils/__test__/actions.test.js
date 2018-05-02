import { createActions } from '../actions'

describe('createActions', () => {
  test('create action for string', () => {
    const actionMap = {
      save: 'save',
    }
    const actions = createActions(actionMap)
    expect(actions.save()).toEqual({ type: 'save', payload: {}})
  })

  test('create action for function with paramater', () => {
    const actionMap = {
      save: user => ({ user }),
    }
    const actions = createActions(actionMap)
    expect(actions.save({ name: 'sky' })).toEqual({ type: 'save', payload: { user: { name: 'sky' }}})
  })

  test('create action for function without paramater', () => {
    const actionMap = {
      save: () => ({}),
    }
    const actions = createActions(actionMap)
    expect(actions.save()).toEqual({ type: 'save', payload: {}})
  })

  test('create action for function with Error', () => {
    const actionMap = {
      save: () => {
        return new Error()
      },
    }
    const actions = createActions(actionMap)
    expect(actions.save()).toEqual({ type: 'save', payload: { error: true }})
  })

  test('get action type by toString', () => {
    const actionMap = {
      save: () => {
        return new Error()
      },
    }
    const actions = createActions(actionMap)
    expect(actions.save.toString()).toBe('save')
  })

})
