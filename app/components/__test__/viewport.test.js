import React from 'react'
import render from 'react-test-renderer'
import Viewport from '../Viewport'
import { shallow } from 'enzyme'

describe('Viewport', () => {
  test('viewport snapshot', () => {
    const viewport = render.create(
      <Viewport className="viewport" id="firstViewport">
        <div></div>
      </Viewport>
    )
    expect(viewport.toJSON()).toMatchSnapshot()
  })

  test('shoud viewport contains assigned child', () => {
    const component = shallow(
      <Viewport>
        <div>abc</div>
      </Viewport>
    )
    expect(component.contains(<div>abc</div>)).toBeTruthy()
  })

})
