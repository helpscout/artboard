import * as React from 'react'
import {storiesOf} from '@storybook/react'
import OptionTile, {OptionTileGuides} from './Examples/OptionTile.Example'

const stories = storiesOf('OptionTile', module)

stories.add('OptionTile', () => (
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
    <OptionTileGuides />
    <OptionTile />
  </div>
))
