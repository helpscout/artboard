import React from 'react'
import html2canvas from 'html2canvas'
import styled from '@helpscout/fancy'
import {cx, noop, Keys} from '../utils'

const GRID_PATTERN =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAGElEQVQYV2NkYGD4z4ADMEIlQTQGGHSSABNFBwdl5cZ4AAAAAElFTkSuQmCC'

export class Eyedropper extends React.Component {
  static defaultProps = {
    __debug: false,
    isActive: true,
    onPickColor: noop,
    onStart: noop,
    onReady: noop,
    onStop: noop,
    previewSize: 100,
    previewScale: 5,
  }

  state = {
    canvas: undefined,
    color: undefined,
    isInPreviewMode: false,
    mouseX: 0,
    mouseY: 0,
    bodyOffsetX: 0,
    bodyOffsetY: 0,
    isProcessing: false,
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true

    window.addEventListener('click', this.handleOnClick)
    window.addEventListener('mousemove', this.colorPreview)
    window.addEventListener('keyup', this.handleOnKeyUp)
  }

  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener('click', this.handleOnClick)
    window.removeEventListener('mousemove', this.colorPreview)
    window.removeEventListener('keyup', this.handleOnKeyUp)

    this.closePreview()
  }

  safeSetState = (state, callback) => {
    if (!this._isMounted) return
    this.setState(state, props => {
      if (callback && typeof callback === 'function') {
        callback(props)
      }
    })
  }

  handleOnClick = event => {
    if (!this.state.isInPreviewMode) {
      this.startPreviewMode(event)
    } else {
      this.stopPreviewMode()
    }
  }

  handleOnKeyUp = event => {
    if (this.state.isInPreviewMode) {
      if (event.keyCode === Keys.ESC) {
        this.closePreview()
      }
    }
  }

  startPreviewMode = (event = {x: 0, y: 0}) => {
    if (!this.props.isActive) return
    if (this.state.isProcessing) return

    const {x, y} = event

    this.props.onStart()

    this.safeSetState(
      {
        isProcessing: true,
      },
      () => {
        html2canvas(document.body, {
          logging: this.props.__debug,
          scale: 1,
        }).then(canvas => {
          document.body.style.cursor = 'none'

          this.props.onReady()

          this.safeSetState({
            canvas,
            isInPreviewMode: true,
            isProcessing: false,
            mouseX: x,
            mouseY: y,
          })
        })
      },
    )
  }

  stopPreviewMode = () => {
    this.copyColorToClipboard()
    console.log(`Selected color ${this.state.color}`)
    this.closePreview()
  }

  closePreview = event => {
    document.body.style.cursor = null
    this.props.onStop(this.state.color)

    this.safeSetState({
      color: undefined,
      isInPreviewMode: false,
    })
  }

  colorPreview = event => {
    if (!this.state.canvas) return

    const {x, y} = event
    const color = getColorFromCanvas(this.state.canvas, x, y)

    this.renderPreviewCanvas(x, y)

    this.safeSetState({
      color,
      mouseX: x,
      mouseY: y,
    })
  }

  copyColorToClipboard = () => {
    const el = document.createElement('textarea')
    el.value = this.state.color
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  renderPreviewCanvas = (x, y) => {
    if (!this.state.canvas || !this.previewCanvas) return
    if (!this.state.isInPreviewMode) return

    const {previewSize, previewScale} = this.props
    const context = this.previewCanvas.getContext('2d')
    const canvasSize = Math.round(previewSize / previewScale)
    const offsetPreviewSize = Math.round(canvasSize / 2)
    const accuracyBuffer = 0.5 // For non-2x resolution displays

    context.drawImage(
      this.state.canvas,
      x - offsetPreviewSize + accuracyBuffer,
      y - offsetPreviewSize + accuracyBuffer,
      canvasSize,
      canvasSize,
      0,
      0,
      canvasSize,
      canvasSize,
    )
  }

  getColorPreviewStyles = () => {
    const {color, isInPreviewMode, mouseX, mouseY} = this.state

    const boxShadow = `
      0 0 0 3px ${color},
      0 0 0 4px white,
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 0px 12px 3px rgba(0, 0, 0, 0.3),
      0 8px 20px rgba(0, 0, 0, 0.2)
    `

    return {
      boxShadow,
      display: isInPreviewMode ? 'block' : 'none',
      transform: `translate(${mouseX - 50}px,${mouseY - 50}px)`,
    }
  }

  setPreviewNodeRef = node => (this.previewCanvas = node)

  render() {
    const {previewSize, previewScale} = this.props
    const {color} = this.state

    const previewNodeSize = Math.round(previewSize / previewScale)

    return (
      <ColorPreviewUI
        style={this.getColorPreviewStyles()}
        previewSize={previewSize}
      >
        <GridUI />
        <PreviewCanvasUI
          ref="previewCanvas"
          innerRef={this.setPreviewNodeRef}
          width={previewNodeSize}
          height={previewNodeSize}
          previewSize={previewSize}
          previewScale={previewScale}
        />
        <CrosshairUI />
        <LabelUI>{color}</LabelUI>
      </ColorPreviewUI>
    )
  }
}

function getColorFromCanvas(canvas, x, y) {
  const croppedCanvas = document.createElement('canvas')
  const croppedCanvasContext = croppedCanvas.getContext('2d')

  croppedCanvas.width = 1
  croppedCanvas.height = 1

  croppedCanvasContext.drawImage(canvas, x, y, 1, 1, 0, 0, 1, 1)

  const colorRawValues = croppedCanvasContext.getImageData(0, 0, 1, 1).data
  const hexColor = getHexFromRawCanvasColor(colorRawValues)

  return hexColor
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) return
  return ((r << 16) | (g << 8) | b).toString(16)
}

function getHexFromRawCanvasColor(rawCanvasColor) {
  return (
    '#' +
    (
      '000000' +
      rgbToHex(rawCanvasColor[0], rawCanvasColor[1], rawCanvasColor[2])
    ).slice(-6)
  )
}

const ColorPreviewUI = styled('div')`
  box-sizing: border-box;
  border: 3px solid white;
  border-radius: 9999px;
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  will-change: transform, box-shadow;

  ${({previewSize}) => `
    height: ${previewSize}px;
    width: ${previewSize}px;
  `} * {
    box-sizing: border-box;
  }
`

const CrosshairUI = styled('div')`
  box-sizing: border-box;
  border: 1px solid white;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
  height: 6px;
  width: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -3px 0 0 -3px;
  z-index: 999999;
`

const LabelUI = styled('div')`
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 10px;
  line-height: 1;
  padding: 4px 4px;
  position: absolute;
  bottom: 13px;
  width: 54px;
  left: 50%;
  margin-left: -27px;
  text-align: center;
  z-index: 999999;
`

const PreviewCanvasUI = styled('canvas')`
  display: block;
  border-radius: 99999px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;

  ${({previewSize, previewScale}) => {
    const canvasSize = Math.round(previewSize / previewScale)

    return `
      height: ${canvasSize}px;
      width: ${canvasSize}px;
      transform: translate(-50%, -50%) scale(${previewScale});
    `
  }};
`

const GridUI = styled('div')`
  background: url(${GRID_PATTERN}) 1px 1px repeat;
  position: absolute;
  opacity: 0.2;
  top: 0;
  left: 0;
  border-radius: 9999px;
  width: 100%;
  height: 100%;
  z-index: 999999;
`

export default Eyedropper
