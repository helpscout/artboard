import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Button from '@helpscout/hsds-react/components/Button'
import Artboard from '../src/Artboard'
import ArtboardProvider from '../src/ArtboardProvider'
import Guide from '../src/Guide'

const stories = storiesOf('ArtboardProvider', module)

stories.add('Dark Mode Test', () => (
  <ArtboardProvider darkMode={true} id="dark-mode-pp">
    <Artboard
      guides={[
        <Guide height="20px" top="15px" width="100%" />,
        <Guide height="20px" bottom="15px" width="100%" />,
        <Guide height="100%" left="15px" width="10px" />,
        <Guide height="100%" right="15px" width="10px" />,
      ]}
    >
      <Button version={2} kind="primary" size="lg">
        Button
      </Button>
    </Artboard>
  </ArtboardProvider>
))
