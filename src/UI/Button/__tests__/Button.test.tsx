import * as React from 'react'
import {mount} from 'enzyme'
import Button from '../Button'
import {getStyle} from '../../../testHelpers'

describe('Children', () => {
  test('Can render content', () => {
    const wrapper = mount(<Button>Hallo</Button>)

    expect(wrapper.text()).toBe('Hallo')
  })
})

describe('Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = mount(<Button />)
    const el = wrapper.find('svg')

    expect(el.length).toBe(0)
  })

  test('Can render an Icon', () => {
    const wrapper = mount(<Button icon="Box" />)
    const el = wrapper.find('svg')

    expect(el.length).toBe(1)
  })
})

describe('Events', () => {
  test('onClick callback works', () => {
    const spy = jest.fn()
    const wrapper = mount(<Button onClick={spy} />)
    const el = wrapper.find('button')

    el.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('isActive', () => {
  test('Looks different when active', () => {
    const wrapper = mount(<Button />)
    const el = wrapper.find('button')
    const bgColor = getStyle(el, 'background')
    wrapper.setProps({isActive: true})

    expect(bgColor).not.toEqual(getStyle(el, 'background'))
  })
})
