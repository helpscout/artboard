import * as React from 'react'
import {mount} from 'enzyme'
import Eyedropper from './index'

describe('Render', () => {
  test('Can render component', () => {
    expect(mount(<Eyedropper />)).toBeTruthy()
  })
})
