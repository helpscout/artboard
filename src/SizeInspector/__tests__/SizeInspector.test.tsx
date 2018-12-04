import * as React from 'react'
import {mount} from 'enzyme'
import SizeInspector from '../index'

describe('Render', () => {
  test('Can render component', () => {
    expect(mount(<SizeInspector />)).toBeTruthy()
  })
})
