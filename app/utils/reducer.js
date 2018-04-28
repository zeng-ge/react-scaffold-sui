export function createReducer(actions, initialState) {
  return function(state = initialState, action) {
    const type = action.type
    return actions[type] ? actions[type](state, action.payload) : state
  }
}
