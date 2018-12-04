import * as React from 'react'
import {mount} from 'enzyme'
import Base from '../Base'
import {getStyle} from '../../../testHelpers'

describe('Base', () => {
  test('Renders a div with default styles', () => {
    const wrapper = mount(<Base />)
    const el = wrapper.find('div')

    expect(el.length).toBe(1)
    expect(getStyle(el, 'box-sizing')).toBe('border-box')
    expect(getStyle(el, 'font-family')).toContain('apple-system')
  })
})

describe('Content', () => {
  test('Renders content', () => {
    const wrapper = mount(<Base>Hallo</Base>)

    expect(wrapper.text()).toContain('Hallo')
  })
})
