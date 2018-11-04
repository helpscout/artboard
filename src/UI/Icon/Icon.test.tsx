import * as React from 'react'
import {mount} from 'enzyme'
import Icon from './index'

describe('Icon', () => {
  test('Provides a collection of icons', () => {
    const wrapper = mount(
      <div>
        <Icon.Box />
        <Icon.Eraser />
      </div>,
    )
    const el = wrapper.find('svg')

    expect(el.length).toBe(2)
  })
})
