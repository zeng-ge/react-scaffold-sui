import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import FakeLogin from '../FakeLogin'

describe('FakeLogin', () => {

  let store = {}

  beforeEach(() => {
    store = global.getStore({
      app: {
        user: {
          userId: '123',
        },
      },
    })
  })

  /**
   * FakeLogin是用connect wrap之后的Componnet
   * enzyme的find只能查找到外层的节点，如
   * <div>
   *  <A></A>
   *  <B></B>
   * </div>
   *
   * 而A本身内部实现可以是：<div><C></C></div>
   * 可以直接找出A与B, 但是它找不出C，所以这个时候要选找出A，再通过A找出C
   * 找法如下：
   * component.find('A').dive().find('C')
   * dive的作用是shallow render当前wrapper的非dom child并返回一个新的wrapper
   *
  */
  test('should FakeLogin component show login <a>己登录, 去首页</a>', () => {
    const component = shallow(<FakeLogin store={store} />)
    expect(component.find('FakeLogin').dive().find('a').first().text()).toBe('己登录, 去首页')
  })

  test('should FakeLogin component show login <a>未登录/a>', () => {
    store = global.getStore({ app: {}})
    const component = shallow(<FakeLogin store={store} />)
    expect(component.find('FakeLogin').dive().find('span').first().text()).toBe('未登录')
  })

  test('FakeLogin props.user should be assigned', () => {
    const component = shallow(
      <FakeLogin store={store} />
    )
    expect(component.find('FakeLogin').prop('user')).toEqual({ userId: '123' })
  })

  test('render FakeLogin with user', () => {
    expect(renderer.create(<FakeLogin store={store} />).toJSON()).toMatchSnapshot()
  })

  test('render FakeLogin without user', () => {
    store = global.getStore({ app: {}})
    expect(renderer.create(<FakeLogin store={store} />).toJSON()).toMatchSnapshot()
  })

})
