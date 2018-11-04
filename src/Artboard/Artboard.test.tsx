import * as React from 'react'
import {mount} from 'enzyme'
import Artboard from './index'

describe('Render', () => {
  test('Can render component', () => {
    expect(mount(<Artboard />)).toBeTruthy()
  })
})
