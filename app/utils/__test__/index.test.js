import { isContainKey } from '../index'

describe('utils/index', () => {
  test('should contain special key', () => {
    const map = { name: 'sky' }
    const keys = ['name']
    expect(isContainKey(map, keys)).toBeTruthy()
  })
  test('should not contain special key', () => {
    const map = { name: 'sky' }
    const keys = ['age']
    expect(isContainKey(map, keys)).toBeFalsy()
  })
})
