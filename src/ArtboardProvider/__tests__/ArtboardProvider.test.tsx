import * as React from 'react'
import {mount} from 'enzyme'
import Artboard from '../../Artboard/index'
import ArtboardProvider from '../index'

describe('Render', () => {
  test('Can render component', () => {
    expect(
      mount(
        <ArtboardProvider>
          <Artboard />
        </ArtboardProvider>,
      ),
    ).toBeTruthy()
  })
})
