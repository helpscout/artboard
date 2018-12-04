import * as React from 'react'
import {mount} from 'enzyme'
import GuideContainer from '../index'
import Guide from '../../Guide/index'
import {dotcx} from '../../utils/index'
import {findOne, getStyle} from '../../testHelpers'

describe('Styles', () => {
  test('Renders CSS-based props as CSS styles', () => {
    const wrapper = mount(
      <GuideContainer padding={100} display="inline-flex" />,
    )
    const node = findOne(wrapper, dotcx('GuideContainer'))

    expect(getStyle(node).padding).toContain('100')
  })
})

describe('Guide', () => {
  test('Can render Guides', () => {
    const wrapper = mount(
      <GuideContainer padding={100} display="inline-flex">
        <Guide />
        <Guide />
        <Guide />
      </GuideContainer>,
    )
    const nodes = wrapper.find('Guide')

    expect(nodes.length).toBeGreaterThanOrEqual(3)
  })
})
