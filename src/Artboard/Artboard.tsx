import * as React from 'react'
import {Provider, connect} from 'react-redux'
import * as actions from './Artboard.actions'
import {ThemeProvider} from '@helpscout/fancy'
import store from './Artboard.store'
import {defaultProps} from './Artboard.utils'
import {Keys, isInputNode} from '../utils'
import {saveSessionState} from './Artboard.utils'
import {ZoomWrapperUI, KeyboardHintsWrapperUI, config} from './Artboard.css'
import Canvas from './components/Artboard.Canvas'
import Crosshair from './components/Artboard.Crosshair'
import Eyedropper from './components/Artboard.Eyedropper'
import KeyboardHints from './Artboard.KeyboardHints'
import Toolbar from './components/Toolbar'
import Wrapper from './components/Artboard.Wrapper'
import Zoom from './components/Artboard.Zoom'

export class Artboard extends React.Component<any> {
  static defaultProps = defaultProps
  __bodyBackGroundColor: string | null = null

  constructor(props) {
    super(props)
    props.onReady(props.__initialProps)
    props.loadLocalState(props.__initialProps)
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

    this.props.saveLocalState()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.props.saveLocalState()
    }
    return true
  }

  getArtboardNameFromProps = props => {
    return props.id || props.name
  }

  saveState = () => {
    const artboardName = this.getArtboardNameFromProps(this.props)
    if (!artboardName) return

    saveSessionState(artboardName, this.state)
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
      case Keys.PERIOD:
        if (event.metaKey || event.ctrlKey) {
          this.toggleInterface()
        }
        break
      default:
        break
    }
  }

  handleOnKeyUp = event => {
    switch (event.keyCode) {
      case Keys.Z:
        this.props.zoomReset()
        break

      case Keys.X:
        if (!isInputNode(event.target)) {
          this.toggleCrosshair()
        }
        break

      case Keys.SPACE:
        this.props.moveEnd()
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

    this.props.performActionEnd()
  }

  handleOnClick = () => {
    const {isZooming} = this.props

    if (isZooming) {
      if (isZooming === 'in') {
        this.zoomIn()
      } else {
        this.zoomOut()
      }
    }
  }

  handleOnMouseDown = () => {
    const {isMoving} = this.props

    if (isMoving && isMoving !== 'dragging') {
      this.props.moveDragStart()
    }
  }

  handleOnMouseUp = () => {
    const {isMoving} = this.props

    if (isMoving && isMoving === 'dragging') {
      this.props.moveDragEnd()
    }
  }

  handleOnMouseMove = event => {
    const {isMoving} = this.props

    if (isMoving && isMoving === 'dragging') {
      const {movementX, movementY} = event

      this.props.moveDrag({
        posX: movementX,
        posY: movementY,
      })
    }
  }

  toggleDarkMode = () => {
    this.props.toggleDarkMode()
  }

  toggleInterface = () => {
    this.props.toggleInterface()
  }

  prepareZoomIn = () => {
    if (this.props.isKeyDown && this.props.isZooming === 'in') return

    this.props.zoomInStart()
  }

  prepareZoomOut = () => {
    if (this.props.isKeyDown && this.props.isZooming === 'out') return

    this.props.zoomOutStart()
  }

  prepareMove = () => {
    if (this.props.isKeyDown && this.props.isMoving) return

    this.props.moveStart()
  }

  zoomIn = (event?: Event) => {
    if (event) {
      event.stopPropagation()
    }
    this.props.zoomIn()
  }

  zoomOut = (event?: Event) => {
    if (event) {
      event.stopPropagation()
    }
    this.props.zoomOut()
  }

  toggleGuides = () => {
    this.props.toggleGuides()
  }

  toggleBoxInspector = () => {
    this.props.toggleBoxInspector()
  }

  toggleSizeInspector = () => {
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

  toggleCrosshair = () => {
    this.props.toggleCrosshair()
  }

  stopCrosshair = () => {
    this.props.stopCrosshair()
  }

  clearSnapshots = () => {
    this.props.clearCrosshairSnapshots()
  }

  render() {
    const {darkMode, children, showInterface} = this.props

    return (
      <ThemeProvider theme={{darkMode}}>
        <Wrapper>
          <Crosshair />
          <Eyedropper />
          {showInterface && <Toolbar />}
          <Canvas>{children}</Canvas>
          <ZoomWrapperUI>{showInterface && <Zoom />}</ZoomWrapperUI>
          <KeyboardHintsWrapperUI>
            <KeyboardHints />
          </KeyboardHintsWrapperUI>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {darkMode, isKeyDown, isMoving, isZooming, showInterface} = state
  const artboardName = ownProps.id || ownProps.name || ''

  return {
    __initialProps: {...ownProps, artboardName},
    artboardName,
    darkMode,
    isKeyDown,
    isMoving,
    isZooming,
    showInterface,
  }
}

const mapDispatchToProps = {
  loadLocalState: actions.loadLocalState,
  saveLocalState: actions.saveLocalState,
  onReady: actions.onReady,
  clearCrosshairSnapshots: actions.clearCrosshairSnapshots,
  moveStart: actions.moveStart,
  moveEnd: actions.moveEnd,
  moveDragStart: actions.moveDragStart,
  moveDrag: actions.moveDrag,
  moveDragEnd: actions.moveDragEnd,
  performActionStart: actions.performActionStart,
  performActionEnd: actions.performActionEnd,
  startEyeDropper: actions.startEyeDropper,
  readyEyeDropper: actions.readyEyeDropper,
  stopEyeDropper: actions.stopEyeDropper,
  stopCrosshair: actions.stopCrosshair,
  toggleCrosshair: actions.toggleCrosshair,
  toggleBoxInspector: actions.toggleBoxInspector,
  toggleDarkMode: actions.toggleDarkMode,
  toggleInterface: actions.toggleInterface,
  toggleGuides: actions.toggleGuides,
  toggleSizeInspector: actions.toggleSizeInspector,
  zoomIn: actions.zoomIn,
  zoomOut: actions.zoomOut,
  zoomInStart: actions.zoomInStart,
  zoomOutStart: actions.zoomOutStart,
  zoomReset: actions.zoomReset,
}

export const ConnectedArtboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Artboard)

export default props => {
  return (
    <Provider store={store}>
      <ConnectedArtboard {...props} />
    </Provider>
  )
}
