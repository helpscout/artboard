import {Props, State, Action} from './Artboard.types'
import * as React from 'react'
import KeyboardHints from './Artboard.KeyboardHints'
import ToolbarButton from './Artboard.ToolbarButton'
import Toolbar from './Artboard.Toolbar'
import reducer, {initialState} from './Artboard.reducer'
import Zoom from './Artboard.Zoom'
import BoxInspector from '../BoxInspector'
import Crosshair from '../Crosshair'
import Eyedropper from '../Eyedropper'
import Resizer from '../Resizer'
import GuideProvider from '../GuideProvider'
import GuideContainer from '../GuideContainer'
import Guide from '../Guide'
import ActionTypes from './Artboard.ActionTypes'
import {cx, Keys, isInputNode} from '../utils'
import {loadSessionState, saveSessionState} from './Artboard.utils'
import {
  ArtboardWrapperUI,
  ArtboardUI,
  ContentUI,
  ZoomWrapperUI,
  KeyboardHintsWrapperUI,
  ToolbarWrapperUI,
  ToolbarRightUI,
  config,
} from './Artboard.css'

export class Artboard extends React.Component<Props, State> {
  static defaultProps = {
    __debug: false,
    alignHorizontally: 'center',
    alignVertically: 'center',
    darkMode: false,
    defaultHeight: 400,
    defaultWidth: 400,
    posX: 0,
    posY: 0,
    showGuides: true,
    showBoxInspector: false,
    snapshots: [],
    withCrosshair: true,
    zoomLevel: 1,
  }

  __bodyBackGroundColor: string | null = null

  constructor(props) {
    super(props)

    const {
      posX,
      posY,
      showGuides,
      showBoxInspector,
      width,
      height,
      snapshots,
      zoomLevel,
    } = props

    const artboardName = this.getArtboardNameFromProps(props)
    const localState = loadSessionState(artboardName)

    const mergedState = {
      ...initialState,
      posX,
      posY,
      showGuides,
      showBoxInspector,
      snapshots,
      zoomLevel,
      artboardHeight: height,
      artboardWidth: width,
      ...localState,
    }

    this.state = mergedState
  }

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
        // Save session to localStorage
        this.saveState()
      },
    )
  }

  getArtboardNameFromProps = props => {
    return props.id || props.name
  }

  saveState = () => {
    const artboardName = this.getArtboardNameFromProps(this.props)
    if (!artboardName) return

    saveSessionState(artboardName, this.state)
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
        this.stopCrosshair()
        if (event.altKey) {
          this.prepareZoomOut()
        } else {
          this.prepareZoomIn()
        }
        break
      case Keys.SPACE:
        this.stopCrosshair()
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

      case Keys.X:
        if (!isInputNode(event.target)) {
          this.toggleCrosshair()
        }
        break

      case Keys.SPACE:
        this.setStateWithReducer({type: ActionTypes.MOVE_END})
        break

      case Keys.ESC:
        this.stopCrosshair()
        break

      case Keys.BACKSPACE:
        if (!isInputNode(event.target)) {
          this.clearSnapshots()
        }
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

  handleOnResize = (event, resizeProps) => {
    const {height, width} = resizeProps.size

    return this.setStateWithReducer({
      type: ActionTypes.RESIZE_ARTBOARD,
      payload: {
        artboardHeight: height,
        artboardWidth: width,
      },
    })
  }

  getResizerProps = () => {
    const {artboardHeight, artboardWidth} = this.state
    const {
      defaultWidth,
      defaultHeight,
      height,
      width,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      withResponsiveHeight,
      withResponsiveWidth,
    } = this.props

    return {
      defaultWidth,
      defaultHeight,
      height: artboardHeight || height,
      width: artboardWidth || width,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      withResponsiveHeight,
      withResponsiveWidth,
    }
  }

  toggleGuides = event => {
    event.stopPropagation()
    this.setStateWithReducer({type: ActionTypes.TOGGLE_GUIDES})
  }

  toggleBoxInspector = event => {
    event.stopPropagation()
    this.setStateWithReducer({type: ActionTypes.TOGGLE_BOX_INSPECTOR})
  }

  startEyeDropper = () => {
    this.setStateWithReducer({type: ActionTypes.CROSSHAIR_END})
    this.setStateWithReducer({type: ActionTypes.EYEDROPPER_START})
  }

  readyEyeDropper = () => {
    this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_START})
    this.setStateWithReducer({type: ActionTypes.EYEDROPPER_READY})
  }

  stopEyeDropper = () => {
    this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_END})
    this.setStateWithReducer({type: ActionTypes.EYEDROPPER_STOP})
  }

  toggleCrosshair = (event?: Event) => {
    if (event) {
      event.stopPropagation()
    }

    if (this.state.isCrosshairActive) {
      this.stopCrosshair()
    } else {
      this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_START})
      this.setStateWithReducer({type: ActionTypes.CROSSHAIR_START})
    }
  }

  stopCrosshair = () => {
    if (this.state.isCrosshairActive) {
      this.setStateWithReducer({type: ActionTypes.PERFORM_ACTION_END})
      this.setStateWithReducer({type: ActionTypes.CROSSHAIR_END})
    }
  }

  addSnapshot = snapshot => {
    this.setStateWithReducer({
      type: ActionTypes.CROSSHAIR_ADD_SNAPSHOT,
      payload: {
        snapshot,
      },
    })
  }

  handleClearSnapshots = event => {
    event.stopPropagation()
    this.clearSnapshots()
  }

  clearSnapshots = () => {
    this.setStateWithReducer({type: ActionTypes.CROSSHAIR_CLEAR})
  }

  resetSettings = event => {
    event.stopPropagation()
    this.setStateWithReducer({type: ActionTypes.RESET})
  }

  renderToolbar = () => {
    const {showBoxInspector, showGuides, isCrosshairActive} = this.state
    return (
      <ToolbarWrapperUI>
        <Toolbar>
          <ToolbarButton
            onClick={this.toggleGuides}
            label="Guides"
            icon="Ruler"
            isActive={showGuides}
          />
          <ToolbarButton
            onClick={this.toggleBoxInspector}
            label="Box Inspector"
            icon="Box"
            isActive={showBoxInspector}
          />
          <ToolbarButton
            onClick={this.startEyeDropper}
            label="Color"
            icon="EyeDropper"
          />
          <ToolbarButton
            onClick={this.toggleCrosshair}
            label="Crosshair"
            icon="Crosshair"
            isActive={isCrosshairActive}
          />
          <ToolbarRightUI>
            <ToolbarButton
              onClick={this.handleClearSnapshots}
              label="Clear Crosshairs"
              icon="Eraser"
            />
            <ToolbarButton
              onClick={this.resetSettings}
              label="Reset"
              icon="Refresh"
            />
          </ToolbarRightUI>
        </Toolbar>
      </ToolbarWrapperUI>
    )
  }

  renderGuides = () => {
    const {guides, withCrosshair} = this.props
    let guidesMarkup = guides

    if (Array.isArray(guides)) {
      guidesMarkup = guides.map((Item, index) => {
        const key = `guide-${index}`

        if (React.isValidElement(Item)) {
          return React.cloneElement(Item, {key})
        }

        return <Guide {...Item} key={key} />
      })
    }

    return (
      <GuideContainer
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={999999}
      >
        {guidesMarkup}
        {withCrosshair && [
          <Guide
            top="50%"
            width="100%"
            height={1}
            showValues={false}
            key="cross1"
          />,
          <Guide
            left="50%"
            height="100%"
            width={1}
            showValues={false}
            key="cross2"
          />,
        ]}
      </GuideContainer>
    )
  }

  render() {
    const {alignHorizontally, alignVertically, children} = this.props
    const {
      showGuides,
      showBoxInspector,
      isCrosshairActive,
      isEyeDropperActive,
      snapshots,
      showSnapshots,
    } = this.state

    return (
      <GuideProvider showGuide={showGuides}>
        <ArtboardWrapperUI className={cx('ArtboardWrapper')} {...this.state}>
          <Crosshair
            isActive={isCrosshairActive}
            showSnapshots={showSnapshots}
            snapshots={snapshots}
            onSnapshot={this.addSnapshot}
          />
          <Eyedropper
            isActive={isEyeDropperActive}
            onReady={this.readyEyeDropper}
            onStop={this.stopEyeDropper}
          />
          {this.renderToolbar()}
          <ArtboardUI {...this.state} className={cx('Artboard')}>
            <ContentUI
              className={cx('ArtboardContent')}
              {...{
                alignHorizontally,
                alignVertically,
              }}
            >
              <Resizer
                {...this.getResizerProps()}
                onResize={this.handleOnResize}
              >
                <BoxInspector showOutlines={showBoxInspector}>
                  {children}
                </BoxInspector>
              </Resizer>
              {this.renderGuides()}
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
