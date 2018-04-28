import immutable from 'seamless-immutable'
import { createReducer } from '../../utils/reducer'

const initialState = immutable.from({
  user: {},
})
const actonHandlers = {
  saveUser(state, payload) {
    return state.set('user', payload.user)
  },
}

export default createReducer(actonHandlers, initialState)
