import {State, Action} from './Artboard.types'
import * as React from 'react'
import {Provider, connect} from 'react-redux'
import * as actions from './actions'
import {ThemeProvider} from '@helpscout/fancy'
import store from './store'
import KeyboardHints from './Artboard.KeyboardHints'
import ToolbarButton from './Artboard.ToolbarButton'
import Toolbar from './Artboard.Toolbar'
import reducer, {initialState} from './Artboard.reducer'
import Crosshair from '../Crosshair'
import GuideProvider from '../GuideProvider'
import GuideContainer from '../GuideContainer'
import Guide from '../Guide'
import ActionTypes from './Artboard.ActionTypes'
import {defaultProps} from './Artboard.utils'
import {cx, Keys, isInputNode} from '../utils'
import {loadSessionState, saveSessionState} from './Artboard.utils'
import {
  ArtboardWrapperUI,
  ZoomWrapperUI,
  KeyboardHintsWrapperUI,
  ToolbarWrapperUI,
  ToolbarLeftUI,
  ToolbarRightUI,
  config,
} from './Artboard.css'
// REDUX
import Canvas from './components/Artboard.Canvas'
import Eyedropper from './components/Artboard.Eyedropper'
import Zoom from './components/Artboard.Zoom'

export class Artboard extends React.Component<any, State> {
  static defaultProps = defaultProps
  __bodyBackGroundColor: string | null = null

  constructor(props) {
    super(props)

    const {
      darkMode,
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
      darkMode,
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

    props.onReady(props)
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
      case Keys.D:
        if (event.altKey) {
          this.toggleDarkMode()
        }
        break
      case Keys.Z:
        this.stopCrosshair()
        if (event.altKey) {
          this.prepareZoomOut()
        } else {
          this.prepareZoomIn()
        }
        break
      case Keys.B:
        this.toggleBoxInspector()
        break
      case Keys.G:
        this.toggleGuides()
        break
      case Keys.S:
        this.toggleSizeInspector()
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

  toggleDarkMode = () => {
    this.setStateWithReducer({type: ActionTypes.TOGGLE_DARK_MODE})
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

  zoomIn = (event?: Event) => {
    if (event) {
      event.stopPropagation()
    }
    return this.setStateWithReducer({type: ActionTypes.ZOOM_IN})
  }

  zoomOut = (event?: Event) => {
    if (event) {
      event.stopPropagation()
    }
    return this.setStateWithReducer({type: ActionTypes.ZOOM_OUT})
  }

  toggleGuides = (event?: Event) => {
    event && event.stopPropagation()
    this.setStateWithReducer({type: ActionTypes.TOGGLE_GUIDES})
  }

  toggleBoxInspector = (event?: Event) => {
    event && event.stopPropagation()
    this.props.toggleBoxInspector()
  }

  toggleSizeInspector = (event?: Event) => {
    event && event.stopPropagation()
    this.props.toggleSizeInspector()
  }

  startEyeDropper = () => {
    this.props.startEyeDropper()
  }

  readyEyeDropper = () => {
    this.props.readyEyeDropper()
  }

  stopEyeDropper = () => {
    this.props.stopEyeDropper()
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
    const {
      darkMode,
      showBoxInspector,
      showSizeInspector,
      showGuides,
      isCrosshairActive,
    } = this.state

    return (
      <ToolbarWrapperUI>
        <Toolbar>
          <ToolbarLeftUI>
            <ToolbarButton
              onClick={this.toggleDarkMode}
              label="Dark Mode"
              icon="Moon"
              isActive={darkMode}
            />
          </ToolbarLeftUI>
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
            onClick={this.toggleSizeInspector}
            label="Size Inspector"
            icon="Size"
            isActive={showSizeInspector}
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
    const {guides, withCenterGuides} = this.props
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
        {withCenterGuides && [
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

  getArtboardStyles = () => {
    const {posX, posY, zoomLevel} = this.state

    return {
      transform: `scale(${zoomLevel}) translate(${posX}px, ${posY}px)`,
    }
  }

  render() {
    const {children} = this.props
    const {
      darkMode,
      showGuides,
      isCrosshairActive,
      posX,
      posY,
      snapshots,
      showSnapshots,
      zoomLevel,
    } = this.state

    return (
      <ThemeProvider theme={{darkMode}}>
        <GuideProvider showGuide={showGuides}>
          <ArtboardWrapperUI className={cx('ArtboardWrapper')} {...this.state}>
            <Crosshair
              isActive={isCrosshairActive}
              showSnapshots={showSnapshots}
              snapshots={snapshots}
              onSnapshot={this.addSnapshot}
              posX={posX}
              posY={posY}
              zoomLevel={zoomLevel}
            />
            <Eyedropper />
            {this.renderToolbar()}
            <Canvas guides={this.renderGuides()}>{children}</Canvas>
            <ZoomWrapperUI>
              <Zoom />
            </ZoomWrapperUI>
            <KeyboardHintsWrapperUI>
              <KeyboardHints />
            </KeyboardHintsWrapperUI>
          </ArtboardWrapperUI>
        </GuideProvider>
      </ThemeProvider>
    )
  }
}

export const ConnectedArtboard = connect(
  null,
  {
    onReady: actions.onReady,
    startEyeDropper: actions.startEyeDropper,
    readyEyeDropper: actions.readyEyeDropper,
    stopEyeDropper: actions.stopEyeDropper,
    toggleBoxInspector: actions.toggleBoxInspector,
    toggleSizeInspector: actions.toggleSizeInspector,
  },
)(Artboard)

export default props => {
  return (
    <Provider store={store}>
      <ConnectedArtboard {...props} />
    </Provider>
  )
}
