import * as React from 'react'
import styled from '@helpscout/fancy'
import Base from '../UI/Base'
import Button from '../UI/Button'
import LabelText from '../UI/LabelText'
import {noop} from '../utils'

export interface Props {
  onZoomIn: (event: Event) => void
  onZoomOut: (event: Event) => void
  zoomLevel: number
}

export class Zoom extends React.PureComponent<Props> {
  static defaultProps = {
    onZoomIn: noop,
    onZoomOut: noop,
    zoomLevel: 1,
  }

  handleOnKeyDown = event => {
    event.preventDefault()
  }

  render() {
    const {onZoomIn, onZoomOut, zoomLevel} = this.props

    const zoomPercentage = `${zoomLevel * 100}%`

    return (
      <ZoomUI>
        <ZoomActionsUI>
          <Button
            onClick={onZoomOut}
            title="Zoom in"
            tabIndex={-1}
            onKeyDown={this.handleOnKeyDown}
          >
            -
          </Button>
          <ZoomLevelUI>
            <LabelText>{zoomPercentage}</LabelText>
          </ZoomLevelUI>
          <Button
            onClick={onZoomIn}
            title="Zoom out"
            tabIndex={-1}
            onKeyDown={this.handleOnKeyDown}
          >
            +
          </Button>
        </ZoomActionsUI>
        <ZoomTextUI>
          <LabelText>Zoom</LabelText>
        </ZoomTextUI>
      </ZoomUI>
    )
  }
}

const ZoomUI = styled(Base)`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  transform: translateZ(0);
  z-index: 2147483647;
`

const ZoomActionsUI = styled(Base)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  pointer-events: all;

  > * {
    margin: 0 3px;
  }
`

const ZoomTextUI = styled(Base)`
  box-sizing: border-box;
  font-size: 11px;
  line-height: 1;
`

const ZoomLevelUI = styled(ZoomTextUI)`
  position: relative;
  text-align: center;
  padding-left: 1px;
  width: 48px;
`

export default Zoom
