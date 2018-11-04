import * as React from 'react'
import {mount} from 'enzyme'
import Resizer from './index'

describe('Render', () => {
  test('Can render component', () => {
    expect(mount(<Resizer />)).toBeTruthy()
  })
})
