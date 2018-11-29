import * as React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs'
import Artboard from '../src/Artboard'

const stories = storiesOf('Storybook', module)

stories.addDecorator(storyFn => (
  <Artboard withResponsiveWidth>{storyFn()}</Artboard>
))
stories.addDecorator(withKnobs)

// Knobs for React props
stories.add('with a button', () => (
  <button disabled={boolean('Disabled', false)}>
    {text('Label', 'Hello Storybook')}
  </button>
))

// Knobs as dynamic variables.
stories.add('as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala')
  const age = number('Age', 89)

  const content = `I am ${name} and I'm ${age} years old.`
  return <div>{content}</div>
})
