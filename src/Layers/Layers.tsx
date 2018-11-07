import * as React from 'react'
import * as r from './img.png'
import Draggable from 'react-draggable'
import styled from '@helpscout/fancy'

class Layers extends React.PureComponent {
  state = {
    xAlign: 'center',
    yAlign: 'center',
    x: 0,
    y: 0,
    opacity: 50,
    show: true,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.move)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.move)
  }

  resetXY = () => {
    this.setState({
      x: 0,
      y: 0,
    })
  }

  alignTop = () => {
    this.setState({
      yAlign: 'flex-start',
    })
    this.resetXY()
  }

  alignMiddle = () => {
    this.setState({
      yAlign: 'center',
    })
    this.resetXY()
  }

  alignBottom = () => {
    this.setState({
      yAlign: 'flex-end',
    })
    this.resetXY()
  }

  alignLeft = () => {
    this.setState({
      xAlign: 'flex-start',
    })
    this.resetXY()
  }

  alignCenter = () => {
    this.setState({
      xAlign: 'center',
    })
    this.resetXY()
  }

  alignRight = () => {
    this.setState({
      xAlign: 'flex-end',
    })
    this.resetXY()
  }

  adjustOpacity = event => {
    this.setState({
      opacity: event.target.value,
    })
  }

  toggle = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  move = event => {
    const value = event.shiftKey ? 10 : 1
    switch (event.keyCode) {
      case 38:
        this.moveUp(value)
        event.preventDefault()
        break

      case 40:
        this.moveDown(value)
        event.preventDefault()
        break

      case 37:
        this.moveLeft(value)
        event.preventDefault()
        break

      case 39:
        this.moveRight(value)
        event.preventDefault()
        break
    }
  }

  moveUp = value => {
    this.setState({
      y: this.state.y - value,
    })
  }

  moveDown = value => {
    this.setState({
      y: this.state.y + value,
    })
  }

  moveLeft = value => {
    this.setState({
      x: this.state.x - value,
    })
  }

  moveRight = value => {
    this.setState({
      x: this.state.x + value,
    })
  }

  getLayerStyles = () => {
    const {opacity, x, y} = this.state

    return {
      opacity: opacity / 100,
      transform: `translate(${x}px, ${y}px)`,
    }
  }

  render() {
    return (
      <LayersUI>
        <ControlUI>
          <button onClick={this.alignTop}>Top</button>
          <button onClick={this.alignMiddle}>Middle</button>
          <button onClick={this.alignBottom}>Bottom</button>
          <br />
          <button onClick={this.alignLeft}>Left</button>
          <button onClick={this.alignCenter}>Center</button>
          <button onClick={this.alignRight}>Right</button>
          <br />
          Opacity
          <br />
          <input
            type="range"
            name="opacity"
            min="0"
            max="100"
            step="10"
            onChange={this.adjustOpacity}
            value={this.state.opacity}
          />
          <br />
          <button onClick={this.toggle}>Toggle</button>
        </ControlUI>
        <LayerUI {...this.state} style={this.getLayerStyles()}>
          <Draggable>
            <ContentUI show={this.state.show}>
              <ImageUI src={r} width={400} />
            </ContentUI>
          </Draggable>
        </LayerUI>
      </LayersUI>
    )
  }
}

const LayersUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const ControlUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`

const LayerUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({yAlign}) => `
    align-items: ${yAlign};
  `};

  ${({xAlign}) => `
    justify-content: ${xAlign};
  `};
`

const ImageUI = styled('img')`
  pointer-events: none;
`

const ContentUI = styled('div')`
  ${({show}) => `
    display: ${show ? 'block' : 'none'};
  `};
`

export default Layers
