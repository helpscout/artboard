import * as React from 'react'
import {storiesOf} from '@storybook/react'
import Crosshair from '../src/Crosshair'

const stories = storiesOf('Crosshair', module)

stories.add('Example', () => {
  class Example extends React.Component {
    state = {
      isActive: false,
    }

    toggle = () => {
      this.setState({
        isActive: !this.state.isActive,
      })
    }

    render() {
      return (
        <div>
          <Crosshair isActive={this.state.isActive} />
          <button onClick={this.toggle}>Toggle Crosshair</button>
        </div>
      )
    }
  }

  return <Example />
})
