import {Props, State, Action} from './Artboard.types'
import * as React from 'react'
import KeyboardHints from './Artboard.KeyboardHints'
import ToolbarButton from './Artboard.ToolbarButton'
import Toolbar from './Artboard.Toolbar'
import reducer, {initialState} from './Artboard.reducer'
import Zoom from './Artboard.Zoom'
import BoxInspector from '../BoxInspector'
import Resizer from '../Resizer'
import GuideProvider from '../GuideProvider'
import ActionTypes from './Artboard.ActionTypes'
import {cx, Keys, isInputNode} from '../utils'
import {
  ArtboardWrapperUI,
  ArtboardUI,
  ContentUI,
  ZoomWrapperUI,
  KeyboardHintsWrapperUI,
  ToolbarWrapperUI,
  config,
} from './Artboard.css'

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
    return reducer(state, action)
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

  toggleGuides = () => {
    this.setStateWithReducer({type: ActionTypes.TOGGLE_GUIDES})
  }

  toggleBoxInspector = () => {
    this.setStateWithReducer({type: ActionTypes.TOGGLE_BOX_INSPECTOR})
  }

  renderToolbar = () => {
    const {showBoxInspector, showGuides} = this.state
    return (
      <ToolbarWrapperUI>
        <Toolbar>
          <ToolbarButton
            onClick={this.toggleGuides}
            label="Guides"
            icon="📏"
            isActive={showGuides}
          />
          <ToolbarButton
            onClick={this.toggleBoxInspector}
            label="Box Inspector"
            icon="📦"
            isActive={showBoxInspector}
          />
        </Toolbar>
      </ToolbarWrapperUI>
    )
  }

  render() {
    const {alignHorizontally, alignVertically, children} = this.props
    const {showGuides, showBoxInspector} = this.state

    return (
      <GuideProvider showGuide={showGuides}>
        <ArtboardWrapperUI className={cx('ArtboardWrapper')} {...this.state}>
          {this.renderToolbar()}
          <ArtboardUI {...this.state} className={cx('Artboard')}>
            <ContentUI
              className={cx('ArtboardContent')}
              {...{
                alignHorizontally,
                alignVertically,
              }}
            >
              <Resizer {...this.getResizerProps()}>
                <BoxInspector showOutlines={showBoxInspector}>
                  {children}
                </BoxInspector>
              </Resizer>
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
      </GuideProvider>
    )
  }
}

export default Artboard
