import React from 'react'
import {storiesOf} from '@storybook/react'
import {ResizableBox} from 'react-resizable'
import Grid from '../src/Grid'
import './resizable.css'

const stories = storiesOf('Grid', module)

stories.add('Example', () => {
  const props = {
    height: '100%',
  }

  return (
    <ResizableBox width={800} height={400}>
      <Grid {...props} />
    </ResizableBox>
  )
})
