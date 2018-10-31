import * as React from 'react'
import {storiesOf} from '@storybook/react'
import OptionTile, {OptionTileGuides} from './Examples/OptionTile.Example'
import Artboard from '../src/Artboard'

const stories = storiesOf('Artboard', module)

stories.add('Artboard', () => (
  <Artboard minHeight={193} minWidth={360}>
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
  </Artboard>
))
