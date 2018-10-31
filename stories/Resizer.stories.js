import * as React from 'react'
import {storiesOf} from '@storybook/react'
import OptionTile, {OptionTileGuides} from './Examples/OptionTile.Example'
import Resizer from '../src/Resizer'

const stories = storiesOf('Resizer', module)

stories.add('Example', () => (
  <Resizer width={350} height={193}>
    <div
      style={{
        boxSizing: 'border-box',
        background: '#eee',
        padding: 20,
        position: 'relative',
        height: '100%',
        minHeight: 193,
      }}
    >
      <OptionTileGuides />
      <OptionTile />
    </div>
  </Resizer>
))
