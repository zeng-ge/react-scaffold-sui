import React from 'react'
import ConnectEntry, { Entry } from '../Entry'
import { shallow } from 'enzyme'
import rendered from 'react-test-renderer'

describe('app/containers/Entry', () => {

  beforeEach(() => {
    window.top.User = null
  })

  test('should Entry show children', () => {
    const component = shallow(
      <Entry>
        <div>entry</div>
      </Entry>
    )
    expect(component.contains(<div>entry</div>)).toBeTruthy()
  })

  test('should Entry trigger save user', () => {
    window.top.User = { name: 'sky' }
    const saveUser = jest.fn()
    shallow(
      <Entry saveUser={saveUser}  >
        <div>this is entry</div>
      </Entry>
    )
    expect(saveUser.mock.calls[0][0]).toEqual({ name: 'sky' })
  })

  test('should Entry saveUser is assigned saveUser', () => {
    window.top.User = { name: 'sky' }
    const saveUser = jest.fn()
    //包一层后saveUser不会调用
    const component = shallow(
      <div>
        <Entry saveUser={saveUser} >
          <div>this is entry</div>
        </Entry>
      </div>
    )
    const instance = component.find('Entry')
    expect(instance.prop('saveUser')).toEqual(saveUser)
  })

  test('connect Entry contains assined child', () => {
    const store = global.getStore({})
    const component = shallow(
      <ConnectEntry store={store}>
        <div>connect entry</div>
      </ConnectEntry>
    )
    expect(component.find(Entry).find('div').text()).toEqual('connect entry')
  })

  test('Entry snapshot', () => {
    const store = global.getStore({})
    const component = rendered.create(
      <ConnectEntry store={store}>
        <div>entry snapshot</div>
      </ConnectEntry>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

})
