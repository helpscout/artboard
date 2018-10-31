import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Grid from '../src/Grid'
import Resizer from '../src/Resizer'

const stories = storiesOf('Grid', module)

stories.add('Example', () => {
  const props = {
    height: '100%',
  }

  return (
    <Resizer width={800} height={400}>
      <Grid {...props} />
    </Resizer>
  )
})
