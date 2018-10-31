import * as React from 'react'
import {storiesOf} from '@storybook/react'
import OptionTile, {OptionTileGuides} from './Examples/OptionTile.Example'
import GuideContainer from '../src/GuideContainer'
import Guide from '../src/Guide'
import {ResizableBox} from 'react-resizable'
import './resizable.css'

const stories = storiesOf('OptionTile', module)

stories.add('OptionTile', () => (
  <ResizableBox width={350} height={193}>
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
  </ResizableBox>
))
