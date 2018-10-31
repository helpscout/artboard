import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Eyedropper from '../src/Eyedropper'
import image from '../images/colors.jpg'

const stories = storiesOf('Eyedropper', module)

stories.add('Example', () => {
  return (
    <div>
      <Eyedropper />
      <img src={image} />
    </div>
  )
})
