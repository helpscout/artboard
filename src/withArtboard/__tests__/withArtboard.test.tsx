import * as React from 'react'
import {mount} from 'enzyme'
import withArtboard from '../withArtboard'

describe('Render', () => {
  test('Can render component withArtboard', () => {
    const Component = () => <div />
    const RenderComponent = () => <Component />
    const WrappedRenderComponent = withArtboard()(RenderComponent)
    // @ts-ignore
    const wrapper = mount(WrappedRenderComponent)

    const el = wrapper.find('Component')

    expect(el.exists()).toBeTruthy()
  })
})
