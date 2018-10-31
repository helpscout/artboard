import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Button from '@helpscout/blue/components/Button'
import OptionTile, {OptionTileGuides} from './Examples/OptionTile.Example'
import Artboard from '../src/Artboard'
import Guide from '../src/Guide'

const stories = storiesOf('Artboard', module)

stories.add('Simple', () => (
  <Artboard withResponsiveWidth>
    <div style={{background: '#eee', textAlign: 'center'}}>
      <Button version={2} kind="primary" size="lg">
        Button
      </Button>
    </div>
  </Artboard>
))

stories.add('Component', () => (
  <Artboard minHeight={193} minWidth={360}>
    <div
      style={{
        boxSizing: 'border-box',
        background: '#eee',
        padding: 20,
        minHeight: 193,
      }}
    >
      <OptionTileGuides />
      <OptionTile />
    </div>
  </Artboard>
))

stories.add('Empty', () => <Artboard />)

stories.add('zoomLevel', () => (
  <Artboard minHeight={193} minWidth={360} zoomLevel={2}>
    <div
      style={{
        boxSizing: 'border-box',
        background: '#eee',
        padding: 20,
        minHeight: 193,
      }}
    >
      <OptionTileGuides />
      <OptionTile />
    </div>
  </Artboard>
))

stories.add('Guides (Components)', () => (
  <Artboard
    withResponsiveWidth
    guides={[
      <Guide height="20px" top="15px" width="100%" />,
      <Guide height="20px" bottom="15px" width="100%" />,
      <Guide height="100%" left="15px" width="10px" />,
      <Guide height="100%" right="15px" width="10px" />,
    ]}
  >
    <div style={{background: '#eee', textAlign: 'center'}}>
      <Button version={2} kind="primary" size="lg">
        Button
      </Button>
    </div>
  </Artboard>
))

stories.add('Guides (Objects)', () => (
  <Artboard
    withResponsiveWidth
    guides={[
      {height: '100%', left: 15, width: 10},
      {height: '100%', right: 15, width: 10},
    ]}
  >
    <div style={{background: '#eee', textAlign: 'center'}}>
      <Button version={2} kind="primary" size="lg">
        Button
      </Button>
    </div>
  </Artboard>
))

stories.add('Guides (Component + Objects)', () => (
  <Artboard
    withResponsiveWidth
    guides={[
      <Guide height="20px" top="15px" width="100%" />,
      <Guide height="20px" bottom="15px" width="100%" />,
      {height: '100%', left: 15, width: 10},
      {height: '100%', right: 15, width: 10},
    ]}
  >
    <div style={{background: '#eee', textAlign: 'center'}}>
      <Button version={2} kind="primary" size="lg">
        Button
      </Button>
    </div>
  </Artboard>
))

stories.add('Without Crosshair', () => (
  <Artboard
    withResponsiveWidth
    withCrosshair={false}
    guides={[
      <Guide height="20px" top="15px" width="100%" />,
      <Guide height="20px" bottom="15px" width="100%" />,
      <Guide height="100%" left="15px" width="10px" />,
      <Guide height="100%" right="15px" width="10px" />,
    ]}
  >
    <div style={{background: '#eee', textAlign: 'center'}}>
      <Button version={2} kind="primary" size="lg">
        Button
      </Button>
    </div>
  </Artboard>
))
