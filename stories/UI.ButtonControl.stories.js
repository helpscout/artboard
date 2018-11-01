import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Artboard from '../src/Artboard'
import ButtonControl from '../src/UI/ButtonControl'

const stories = storiesOf('UI/ButtonControl', module)

stories.add('Basic', () => (
  <Artboard>
    <ButtonControl>ButtonControl</ButtonControl>
    <ButtonControl isActive>Active</ButtonControl>
  </Artboard>
))

stories.add('Icon', () => (
  <Artboard>
    <ButtonControl icon="Box">ButtonControl</ButtonControl>
    <ButtonControl icon="Box" isActive>
      ButtonControl
    </ButtonControl>
  </Artboard>
))
