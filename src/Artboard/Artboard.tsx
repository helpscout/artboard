import * as React from 'react'
import styled from '@helpscout/fancy'
import KeyboardHints from './Artboard.KeyboardHints'
import Zoom from './Artboard.Zoom'
import Resizer from '../Resizer'
import {cx, isInputNode} from '../utils'

export const ActionTypes = {
  ZOOM: 'ZOOM',
  ZOOM_IN_START: 'ZOOM_IN_START',
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT_START: 'ZOOM_OUT_START',
  ZOOM_OUT: 'ZOOM_OUT',
  ZOOM_RESET: 'ZOOM_RESET',
  MOVE_START: 'MOVE_START',
  MOVE_END: 'MOVE_END',
  MOVE_DRAG_START: 'MOVE_DRAG_START',
  MOVE_DRAG: 'MOVE_DRAG',
  MOVE_DRAG_END: 'MOVE_DRAG_END',
  RESET: 'RESET',
  PERFORM_ACTION_START: 'PERFORM_ACTION_START',
  PERFORM_ACTION_END: 'PERFORM_ACTION_END',
}

export const config = {
  backgroundColor: '#f2f2f2',
}

const Keys = {
  Z: 90,
  SPACE: 32,
}

export interface Props {
  __debug: boolean
  alignHorizontally: 'left' | 'center' | 'right'
  alignVertically: 'top' | 'middle' | 'bottom'
  darkMode: boolean
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  maxHeight?: number
  maxWidth?: number
  zoomLevel: number
}

export interface State {
  isPerformingAction: boolean
  isKeyDown: boolean
  isMoving: 'start' | 'dragging' | undefined
  isZooming: 'in' | 'out' | undefined
  posX: number
  posY: number
  zoomLevel: number
}

type Action = {
  type: string
  payload?: any
}

const initialState = {
  isPerformingAction: false,
  isKeyDown: false,
  isMoving: undefined,
  isZooming: undefined,
  posX: 0,
  posY: 0,
  zoomLevel: 1,
}

export class Artboard extends React.Component<Props, State> {
  static defaultProps = {
    __debug: false,
    alignHorizontally: 'center',
    alignVertically: 'center',
    darkMode: false,
  }

  state = initialState
  __bodyBackGroundColor: string | null = null

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeyDown)
    window.addEventListener('keyup', this.handleOnKeyUp)
    window.addEventListener('click', this.handleOnClick)
    window.addEventListener('mousedown', this.handleOnMouseDown)
    window.addEventListener('mouseup', this.handleOnMouseUp)
    window.addEventListener('mousemove', this.handleOnMouseMove)
    this.setBackgroundColor()
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnKeyDown)
    window.removeEventListener('keyup', this.handleOnKeyUp)
    window.removeEventListener('click', this.handleOnClick)
    window.removeEventListener('mousedown', this.handleOnMouseDown)
    window.removeEventListener('mouseup', this.handleOnMouseUp)
    window.removeEventListener('mousemove', this.handleOnMouseMove)
    this.unsetBackgroundColor()
  }

  setStateWithReducer = (action: Action) => {
    const __state = {...this.state}

    this.setState(
      // @ts-ignore
      (state: State) => {
        return this.stateReducer(state, action)
      },
      () => {
        if (this.props.__debug) {
          console.group('Artboard: Debugger')
          console.log('Prev State:', __state)
          console.log('Next State:', this.state)
          console.groupEnd()
        }
      },
    )
  }

  stateReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
      case ActionTypes.ZOOM_IN_START:
        return {
          isKeyDown: true,
          isPerformingAction: true,
          isZooming: 'in',
        }

      case ActionTypes.ZOOM_OUT_START:
        return {
          isKeyDown: true,
          isPerformingAction: true,
          isZooming: 'out',
        }

      case ActionTypes.ZOOM_IN:
        return {
          zoomLevel: state.zoomLevel + 0.25,
        }

      case ActionTypes.ZOOM_OUT:
        return {
          zoomLevel: state.zoomLevel - 0.25,
        }

      case ActionTypes.MOVE_START:
        return {
          isKeyDown: true,
          isMoving: 'start',
        }

      case ActionTypes.MOVE_DRAG_START:
        return {
          isMoving: 'dragging',
        }

      case ActionTypes.MOVE_DRAG_END:
        return {
          isMoving: 'start',
          isKeyDown: false,
        }

      case ActionTypes.MOVE_DRAG:
        return {
          isMoving: 'dragging',
          posX: state.posX + (action.payload.posX * 1) / state.zoomLevel,
          posY: state.posY + (action.payload.posY * 1) / state.zoomLevel,
        }

      case ActionTypes.MOVE_END:
        return {
          isMoving: undefined,
        }

      case ActionTypes.PERFORM_ACTION_START:
        return {
          isPerformingAction: true,
        }

      case ActionTypes.PERFORM_ACTION_END:
        return {
          isPerformingAction: false,
        }

      case ActionTypes.ZOOM_RESET:
        return {
          isZooming: undefined,
        }

      case ActionTypes.RESET:
        const {isZooming, posX, posY, ...resetState} = initialState

        return resetState

      default:
        return {}
    }
  }

  setBackgroundColor = () => {
    this.__bodyBackGroundColor = document.body.style.backgroundColor
    document.body.style.backgroundColor = config.backgroundColor
  }

  unsetBackgroundColor = () => {
    document.body.style.backgroundColor = this.__bodyBackGroundColor
  }

  handleOnKeyDown = event => {
    if (isInputNode(event.target)) return

    switch (event.keyCode) {
      case Keys.Z:
        if (event.altKey) {
          this.prepareZoomOut()
        } else {
          this.prepareZoomIn()
        }
        break
      case Keys.SPACE:
        this.prepareMove()
        break
      default:
        break
    }
  }

  handleOnKeyUp = event => {
    switch (event.keyCode) {
      case Keys.Z:
        this.setStateWithReducer({type: ActionTypes.ZOOM_RESET})
        break

      case Keys.SPACE:
        this.setStateWithReducer({type: ActionTypes.MOVE_END})
        break

      default:
        break
    }

    this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_END})
  }

  handleOnClick = () => {
    const {isZooming} = this.state

    if (isZooming) {
      if (isZooming === 'in') {
        this.zoomIn()
      } else {
        this.zoomOut()
      }
    }
  }

  handleOnMouseDown = () => {
    const {isMoving} = this.state

    if (isMoving && isMoving !== 'dragging') {
      return this.setStateWithReducer({type: ActionTypes.MOVE_DRAG_START})
    }
  }

  handleOnMouseUp = () => {
    const {isMoving} = this.state

    if (isMoving && isMoving === 'dragging') {
      return this.setStateWithReducer({type: ActionTypes.MOVE_DRAG_END})
    }
  }

  handleOnMouseMove = event => {
    const {isMoving} = this.state

    if (isMoving && isMoving === 'dragging') {
      const {movementX, movementY} = event

      return this.setStateWithReducer({
        type: ActionTypes.MOVE_DRAG,
        payload: {
          posX: movementX,
          posY: movementY,
        },
      })
    }
  }

  prepareZoomIn = () => {
    if (this.state.isKeyDown && this.state.isZooming === 'in') return

    this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_START})
    this.setStateWithReducer({type: ActionTypes.ZOOM_IN_START})
  }

  prepareZoomOut = () => {
    if (this.state.isKeyDown && this.state.isZooming === 'out') return

    this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_START})
    this.setStateWithReducer({type: ActionTypes.ZOOM_OUT_START})
  }

  prepareMove = () => {
    if (this.state.isKeyDown && this.state.isMoving) return

    this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_START})
    this.setStateWithReducer({type: ActionTypes.MOVE_START})
  }

  zoomIn = () => {
    return this.setStateWithReducer({type: ActionTypes.ZOOM_IN})
  }

  zoomOut = () => {
    return this.setStateWithReducer({type: ActionTypes.ZOOM_OUT})
  }

  getResizerProps = () => {
    const {height, width, minWidth, minHeight, maxWidth, maxHeight} = this.props

    return {
      height,
      width,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
    }
  }

  render() {
    const {alignHorizontally, alignVertically, children} = this.props

    return (
      <ArtboardWrapperUI className={cx('ArtboardWrapper')} {...this.state}>
        <ArtboardUI {...this.state} className={cx('Artboard')}>
          <ContentUI
            className={cx('ArtboardContent')}
            {...{
              alignHorizontally,
              alignVertically,
            }}
          >
            <Resizer {...this.getResizerProps()}>{children}</Resizer>
          </ContentUI>
        </ArtboardUI>
        <ZoomWrapperUI>
          <Zoom
            onZoomIn={this.zoomIn}
            onZoomOut={this.zoomOut}
            zoomLevel={this.state.zoomLevel}
          />
        </ZoomWrapperUI>
        <KeyboardHintsWrapperUI>
          <KeyboardHints />
        </KeyboardHintsWrapperUI>
      </ArtboardWrapperUI>
    )
  }
}

const ArtboardWrapperUI = styled('div')`
  align-items: center;
  background-color: ${config.backgroundColor};
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  user-select: none;

  ${({isZooming}) => {
    if (isZooming === 'in') {
      return 'cursor: zoom-in;'
    }
    if (isZooming === 'out') {
      return 'cursor: zoom-out;'
    }
    return ''
  }};

  ${({isMoving}) => {
    if (isMoving === 'start') {
      return 'cursor: grab;'
    }
    if (isMoving === 'dragging') {
      return 'cursor: grabbing;'
    }
    return ''
  }};
`

export const ArtboardUI = styled('div')`
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  ${({isPerformingAction}) =>
    isPerformingAction &&
    `
    pointer-events: none;
    user-select: none;
  `};

  ${({posX, posY, zoomLevel}) => `
    transform: scale(${zoomLevel}) translate(${posX}px, ${posY}px);
  `};
`

export const ContentUI = styled('div')`
  display: flex;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;

  .${cx('Resizer')} {
    display: flex;
    min-width: 0;
    min-height: 0;
    width: 100%;
    height: 100%;

    ${({alignHorizontally}) => {
      let justifyContent = 'center'
      if (alignHorizontally === 'left') {
        justifyContent = 'flext-start'
      }
      if (alignHorizontally === 'right') {
        justifyContent = 'flext-end'
      }

      return `justify-content: ${justifyContent};`
    }} ${({alignVertically}) => {
      let alignItems = 'center'
      if (alignVertically === 'left') {
        alignItems = 'flext-start'
      }
      if (alignVertically === 'right') {
        alignItems = 'flext-end'
      }

      return `align-items: ${alignItems};`
    }};
  }
`

export const BottomToolBar = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 30px;
  width: 100%;
  z-index: 3;
`

export const ZoomWrapperUI = styled(BottomToolBar)`
  bottom: 40px;
`

export const KeyboardHintsWrapperUI = styled(BottomToolBar)`
  bottom: 10px;
`

export default Artboard
