import { createActions } from 'redux-actions'

export default createActions({
  fetchUser: () => ({}),
  saveUser: user => ({ user }),
})
