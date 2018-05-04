import { configureStore } from '../../../jest/store'
import sagaPromise from '../middlewares/sagaPromise'

describe('saga promise middleware', () => {

  let store = null
  beforeEach(() => {
    const mockStore = configureStore([sagaPromise])
    store = mockStore({})
  })

  test('saga middleware async action', async () => {
    const action = { type: 'promise', async: true, payload: { name: 'sky' }}
    const promise = store.dispatch(action)
    const actions = store.getActions()
    const latestAction = actions[0]
    const { resolve } = latestAction
    resolve(latestAction.payload)

    const result = await promise
    expect(result).toEqual({ name: 'sky' })
  })

})
