export function createReducer(actions, initialState) {
  return function(state, action) {
    if (!state) {
      state = initialState
    }
    const type = action.type
    return actions[type] ? actions[type](state, action.payload) : state
  }
}
