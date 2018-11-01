import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Eyedropper from '../src/Eyedropper'
import image from '../images/colors.jpg'

const stories = storiesOf('Eyedropper', module)

stories.add('Example', () => {
  return (
    <div>
      <h2>Click to start!</h2>
      <h2>Click to start!</h2>
      <h2>Click to start!</h2>
      <h2>Click to start!</h2>
      <Eyedropper __debug={true} />
      <img src={image} />
    </div>
  )
})
