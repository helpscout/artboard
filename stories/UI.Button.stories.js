import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Artboard from '../src/Artboard'
import Button from '../src/UI/Button'

const stories = storiesOf('UI/Button', module)

stories.add('Basic', () => (
  <Artboard>
    <Button>Button</Button>
    <Button isActive>Active</Button>
  </Artboard>
))

stories.add('Icon', () => (
  <Artboard>
    <Button icon="Box">Button</Button>
    <Button icon="Box" isActive>
      Button
    </Button>
  </Artboard>
))
