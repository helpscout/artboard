import * as React from 'react'
import {mount} from 'enzyme'
import Guide from '../index'
import GuideProvider from '../../GuideProvider/index'
import {dotcx} from '../../utils/index'
import {findOne, getStyle} from '../../testHelpers'

describe('Width/Height', () => {
  test('Renders with the specified width/height', () => {
    const wrapper = mount(<Guide width={123} height={456} />)
    const guideNode = findOne(wrapper, dotcx('Guide'))
    const widthNode = findOne(wrapper, dotcx('Guide__width'))
    const heightNode = findOne(wrapper, dotcx('Guide__height'))

    expect(widthNode.text()).toContain('123')
    expect(heightNode.text()).toContain('456')

    expect(getStyle(guideNode).width).toContain('123')
    expect(getStyle(guideNode).height).toContain('456')
  })
})

describe('Styles', () => {
  test('Renders CSS-based props as CSS styles', () => {
    const wrapper = mount(<Guide padding={100} display="inline-flex" />)
    const guideNode = findOne(wrapper, dotcx('Guide'))

    expect(getStyle(guideNode).padding).toContain('100')
    expect(getStyle(guideNode).display).toContain('inline-flex')
  })
})

describe('showValues', () => {
  test('Values can be hidden', () => {
    const wrapper = mount(<Guide width={123} height={456} showValues={false} />)
    const guideNode = findOne(wrapper, dotcx('Guide'))
    const widthNode = findOne(wrapper, dotcx('Guide__width'))
    const heightNode = findOne(wrapper, dotcx('Guide__height'))

    expect(widthNode.length).toBe(0)
    expect(heightNode.length).toBe(0)

    expect(getStyle(guideNode).width).toContain('123')
    expect(getStyle(guideNode).height).toContain('456')
  })
})

describe('showGuide', () => {
  test('Does not render guide, if disabled', () => {
    const wrapper = mount(<Guide width={123} height={456} showGuide={false} />)
    const guideNode = findOne(wrapper, dotcx('Guide'))
    const widthNode = findOne(wrapper, dotcx('Guide__width'))
    const heightNode = findOne(wrapper, dotcx('Guide__height'))

    expect(guideNode.length).toBe(0)
    expect(widthNode.length).toBe(0)
    expect(heightNode.length).toBe(0)
  })
})

describe('Provider', () => {
  test('Gets values from Provider', () => {
    const wrapper = mount(
      <GuideProvider width={123} height={456} showValues={false}>
        <div>
          <Guide />
        </div>
      </GuideProvider>,
    )
    const guideNode = findOne(wrapper, dotcx('Guide'))
    const widthNode = findOne(wrapper, dotcx('Guide__width'))
    const heightNode = findOne(wrapper, dotcx('Guide__height'))

    expect(widthNode.length).toBe(0)
    expect(heightNode.length).toBe(0)

    expect(getStyle(guideNode).width).toContain('123')
    expect(getStyle(guideNode).height).toContain('456')
  })
})

describe('Unmount', () => {
  test('Unmounts without issues', () => {
    const wrapper = mount(<Guide width={123} height={456} showGuide={false} />)
    wrapper.unmount()

    const guideNode = findOne(wrapper, dotcx('Guide'))

    expect(guideNode.length).toBe(0)
  })
})
