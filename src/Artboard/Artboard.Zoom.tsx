import * as React from 'react'
import styled from '@helpscout/fancy'
import {noop} from '../utils'

export interface Props {
  onZoomIn: () => void
  onZoomOut: () => void
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
          <button
            onClick={onZoomOut}
            title="Zoom in"
            tabIndex={-1}
            onKeyDown={this.handleOnKeyDown}
          >
            -
          </button>
          <div>🔍</div>
          <button
            onClick={onZoomIn}
            title="Zoom out"
            tabIndex={-1}
            onKeyDown={this.handleOnKeyDown}
          >
            +
          </button>
        </ZoomActionsUI>
        <ZoomLevelUI>{zoomPercentage}</ZoomLevelUI>
      </ZoomUI>
    )
  }
}

const ZoomUI = styled('div')`
  align-items: center;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  z-index: 999999;
`

const ZoomActionsUI = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  pointer-events: all;

  * {
    margin: 0 5px;
  }
`

const ZoomLevelUI = styled('div')`
  font-size: 11px;
  line-height: 1;
`

export default Zoom
