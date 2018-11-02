import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Artboard from '../src/Artboard'

const stories = storiesOf('SizeInspector', module)

stories.add('Example', () => (
  <Artboard>
    <div>
      <button>Hallo</button>
    </div>
  </Artboard>
))
