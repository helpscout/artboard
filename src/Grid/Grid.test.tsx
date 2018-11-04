import * as React from 'react'
import {mount} from 'enzyme'
import Grid from './index'

describe('Render', () => {
  test('Can render component', () => {
    expect(mount(<Grid />)).toBeTruthy()
  })
})
