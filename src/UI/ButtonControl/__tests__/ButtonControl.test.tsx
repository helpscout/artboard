import * as React from 'react'
import {mount} from 'enzyme'
import ButtonControl from '../index'
import {getStyle} from '../../../testHelpers'

describe('Children', () => {
  test('Can render content', () => {
    const wrapper = mount(<ButtonControl>Hallo</ButtonControl>)

    expect(wrapper.text()).toContain('Hallo')
  })
})

describe('Label', () => {
  test('Renders a label with text', () => {
    const wrapper = mount(<ButtonControl label="text" />)
    const el = wrapper.find('label')

    expect(el.length).toBe(1)
    expect(el.text()).toBe('text')
  })
})

describe('Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = mount(<ButtonControl />)
    const el = wrapper.find('svg')

    expect(el.length).toBe(0)
  })

  test('Can render an Icon', () => {
    const wrapper = mount(<ButtonControl icon="Box" />)
    const el = wrapper.find('svg')

    expect(el.length).toBe(1)
  })
})

describe('Events', () => {
  test('onClick callback works', () => {
    const spy = jest.fn()
    const wrapper = mount(<ButtonControl onClick={spy} />)
    const el = wrapper.find('button')

    el.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('isActive', () => {
  test('Looks different when active', () => {
    const wrapper = mount(<ButtonControl />)
    const el = wrapper.find('button')
    const bgColor = getStyle(el, 'background')
    wrapper.setProps({isActive: true})

    expect(bgColor).not.toEqual(getStyle(el, 'background'))
  })
})
