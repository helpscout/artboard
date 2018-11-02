import * as React from 'react'
import {storiesOf} from '@storybook/react'
import OptionTile from './Examples/OptionTile.Example'
import Artboard from '../src/Artboard'

const stories = storiesOf('SizeInspector', module)

stories.add('Example', () => (
  <Artboard>
    <div>
      Hover your mouse on any element
      <br />
      <div
        style={{
          boxSizing: 'border-box',
          background: '#eee',
          padding: 20,
          position: 'relative',
          height: '100%',
          minHeight: 193,
          width: 360,
        }}
      >
        <OptionTile />
      </div>
    </div>
  </Artboard>
))
