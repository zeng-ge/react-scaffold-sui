export function isContainKey(map, keys) {
  for (let index = 0, length = keys.length; index < length; index++) {
    const key = keys[index]
    if (map[key]) {//判断是否包含对应的key
      return true
    }
  }
  return false
}
