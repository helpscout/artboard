import * as React from 'react'
import {mount} from 'enzyme'
import Crosshair from '../index'

describe('Render', () => {
  test('Can render component', () => {
    expect(mount(<Crosshair />)).toBeTruthy()
  })
})
