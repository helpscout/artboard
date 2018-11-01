import * as React from 'react'
import styled from '@helpscout/fancy'

export class Line extends React.PureComponent<any> {
  static defaultProps = {
    color: 'cyan',
    coordinate: 'x',
    opacity: 1,
    posX: 0,
    posY: 0,
    x: 0,
    y: 0,
  }

  getCenterCoords = () => {
    const {innerHeight, innerWidth} = window

    return {
      x: Math.round(innerWidth / 2),
      y: Math.round(innerHeight / 2),
    }
  }

  isX = () => {
    return this.props.coordinate === 'x'
  }

  getComponent = () => {
    return this.isX() ? LineXUI : LineYUI
  }

  getValue = (): number => {
    const {posX, posY, x, y} = this.props

    const value = this.isX() ? posY + y : posX + x

    return value
  }

  getStyles = () => {
    const value = this.getValue()

    let transform = this.isX()
      ? `translateY(${value}px)`
      : `translateX(${value}px)`

    return {
      transform,
    }
  }

  render() {
    const {className, color, opacity} = this.props
    const Component = this.getComponent()

    return (
      <Component {...{className, color, opacity}} style={this.getStyles()}>
        <LabelUI>
          {this.getValue()}
          px
        </LabelUI>
      </Component>
    )
  }
}

export default Line

const LineBaseUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;

  ${({color}) => `
    color: ${color};
    background-color: currentColor;
  `};

  ${({opacity}) => `
    opacity: ${opacity};
  `};
`

LineBaseUI.defaultProps = {
  opacity: 1,
}

const LineXUI = styled(LineBaseUI)`
  width: 100%;
  height: 1px;
`

const LineYUI = styled(LineBaseUI)`
  height: 100%;
  width: 1px;
`

const LabelUI = styled('div')`
  color: currentColor;
  font-size: 11px;
  padding-top: 2px;
  padding-left: 2px;
  will-change: contents;
`
