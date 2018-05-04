/**
 * 参考：
 * https://github.com/Chion82/redux-wait-for-action
 * https://github.com/redux-saga/redux-saga/issues/697
 *
 * 此中间件必须在sagamiddlewares之前执行，不然就没意义
 * 目的：
 * saga本质上分为watch与work来部分
 * watch用来监听action
 * work用来执行action对应的操作
 * 如work是fetch数据
 *
 * work
 * function* fetchUser(){
 *   const result = yield fetch('/user')
 *   put('fetch-success', result)
 * }
 *
 * watch
 * function* fetchSaga(){
 *   yield takeEvery('fetchUser', fetchUser)
 * }
 *
 * 当在container中执行dispatch({type: 'fetchUser'})时，返回值是什么？
 * 肯定不可能是fetch后的promise
 *
 * 那要想实现dispatch({type: 'fetchUser'}).then(user=>{})该怎么办呢？
 * 本中间件就是为了解决此问题，虽然可能用不到
 *
 * 实现原理：
 * 首先该中间件得在saga中间件之前执行，它会在原本的action中添加resolve与reject两个Promise的回调
 * 最后返回promise即可
 *
 * 使用方式：
 * 对于takeEvery
 * function* fetchUser(action){
 *  const { resolve, reject } = action
 *  try{
 *    const result = yield fetch('/user')
 *    resolve(result.user)
 *  }catch(e){
 *    reject(e)
 *  }
 * }
 *
 * 对于take:
 * function* fetchSaga(){
 *  const action = yield take('fetchUser')
 * ...同上
 * }
*/
export default function() {
  return function(next) {
    return function(action) {
      if (!action.async) {
        return next(action)
      }
      const latestAction = { ...action }
      const promise = new Promise((resolve, reject) => {
        latestAction.resolve = resolve
        latestAction.reject = reject
      })
      next(latestAction)
      return promise
    }
  }
}
