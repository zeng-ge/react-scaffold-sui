import { createActions } from 'utils/actions'

export default createActions({
  saveUser: user => ({ user }),
  eventTracking: (module, action) => ({ module, action }),
})
