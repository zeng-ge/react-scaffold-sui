//mock测试环境中不存在的API
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0)
}

window.localStorage = (function() {
  let store = {}
  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    clear: function() {
      store = {}
    },
  }
})()
