import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ConnectFakeLogin, { FakeLogin } from '../FakeLogin'

describe('FakeLogin', () => {

  test('should FakeLogin component show login <a>己登录, 去首页</a>', () => {
    const user = { userId: '123' }
    const component = shallow(<FakeLogin user={user} />)
    expect(component.find('a').first().text()).toBe('己登录, 去首页')
  })

  test('should FakeLogin component show login <a>己登录, 去首页</a>', () => {
    const component = shallow(<FakeLogin />)
    expect(component.find('span').first().text()).toBe('未登录')
  })

  test('should FakeLogin logined', () => {
    const store = global.getStore({
      app: {
        user: {
          userId: '123',
        },
      },
    })
    expect(renderer.create(<ConnectFakeLogin store={store} />).toJSON()).toMatchSnapshot()
  })

  test('should FakeLogin not login', () => {
    const store = global.getStore({ app: {}})
    expect(renderer.create(<ConnectFakeLogin store={store} />).toJSON()).toMatchSnapshot()
  })

})
