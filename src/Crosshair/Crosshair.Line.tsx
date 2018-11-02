import * as React from 'react'
import styled from '@helpscout/fancy'

export class Line extends React.PureComponent<any> {
  static defaultProps = {
    centerCoords: {x: 0, y: 0},
    color: 'cyan',
    coordinate: 'x',
    opacity: 1,
    isActive: false,
    posX: 0,
    posY: 0,
    x: 0,
    y: 0,
  }

  isX = () => {
    return this.props.coordinate === 'x'
  }

  getComponent = () => {
    return this.isX() ? LineXUI : LineYUI
  }

  getValue = (): number => {
    const values = getValueFromProps(this.props)
    let value

    if (this.isX()) {
      value = values.x
    } else {
      value = values.y
    }

    return value
  }

  getStyles = () => {
    const values = getValueFromProps(this.props)
    let value

    if (this.isX()) {
      value = values.x
    } else {
      value = values.y
    }

    const transform = this.isX()
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

export const getValueFromProps = (props): {x: number; y: number} => {
  const {isActive, centerCoords, x, y, posX, posY, zoomLevel} = props
  let computedX = posY + y
  let computedY = posX + x

  if (!isActive) {
    computedX =
      (centerCoords.y - y) * zoomLevel * -1 + centerCoords.y + posY * zoomLevel
    computedY =
      (centerCoords.x - x) * zoomLevel * -1 + centerCoords.x + posX * zoomLevel
  }

  return {
    x: computedX,
    y: computedY,
  }
}
