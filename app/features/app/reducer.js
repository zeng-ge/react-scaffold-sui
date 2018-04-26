import immutable from 'seamless-immutable'
import { createReducer } from '../../services/ReducerService'

const initialState = immutable.from({
  user: {},
})
const actions = {
  saveUser(state, payload) {
    return state.set('user', payload.user)
  },
}

export default createReducer(actions, initialState)
