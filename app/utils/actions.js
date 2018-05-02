import _ from 'lodash'
/**
 * 参考redux-actions的createActions并简化，以达到删除redux-actions的目的
 * actionMap的结构：
 * {
 *  actionA: ()=>({})
 *  actionB: (user) => ({user})
 * }
 * actionA()调用的结果为{type: 'actionA', payload: {}}
 * actionB()调用的结果为{type: 'actionB', payload: { user }}
*/

const createAction = function(type, action) {
  const actionProxy = function(...args) {
    let state = _.isFunction(action) ? action.apply(null, args) : {}
    if (_.isError(state)) {
      state = { error: true }
    }
    return { type, payload: state }
  }
  actionProxy.toString = () => type
  return actionProxy
}

export function createActions(actionMap) {
  const actions = {}
  _.forEach( actionMap, (action, type) => {
    actions[type] = createAction(type, action)
  } )
  return actions
}
