import * as React from 'react'
import styled from '@helpscout/fancy'
import Line from './Crosshair.Line'
import Base from '../UI/Base'
import {cx, Keys} from '../utils'

export type Snapshot = {
  x: number
  y: number
}

export type ViewportCoordinates = {
  height: number
  width: number
  x: number
  y: number
}

export type Snapshots = Array<Snapshot>

export interface Props {
  color: string
  isActive: boolean
  onSnapshot?: (snapshot: Snapshot) => void
  posX: number
  posY: number
  showSnapshots: boolean
  snapshotOpacity: number
  snapshots: Snapshots
  style?: Object
  zoomLevel: number
}

export interface State {
  centerCoords: ViewportCoordinates
  isActive: boolean
  x: number
  y: number
  snapshots: Snapshots
}

export class Crosshair extends React.PureComponent<Props, State> {
  static defaultProps = {
    color: 'cyan',
    isActive: true,
    posX: 0,
    posY: 0,
    snapshots: [],
    snapshotOpacity: 0.4,
    showSnapshots: true,
    style: {},
    zoomLevel: 1,
  }

  constructor(props) {
    super(props)

    this.state = {
      centerCoords: this.getCenterCoords(),
      isActive: props.isActive,
      x: 0,
      y: 0,
      snapshots: props.snapshots,
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.setCoordinates)
    window.addEventListener('click', this.addSnapshot)
    window.addEventListener('keyup', this.stopCrosshair)
    window.addEventListener('resize', this.setCenterCoords)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.setCoordinates)
    window.removeEventListener('click', this.addSnapshot)
    window.removeEventListener('keyup', this.stopCrosshair)
    window.removeEventListener('resize', this.setCenterCoords)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.state.isActive) {
      this.setState({
        isActive: nextProps.isActive,
      })
    }
    if (nextProps.snapshots !== this.state.snapshots) {
      this.setState({
        snapshots: nextProps.snapshots,
      })
    }
  }

  getCenterCoords = (): ViewportCoordinates => {
    // @ts-ignore
    const {innerHeight, innerWidth} = document.defaultView

    return {
      height: innerHeight,
      width: innerWidth,
      x: Math.round(innerWidth / 2),
      y: Math.round(innerHeight / 2),
    }
  }

  setCenterCoords = () => {
    this.setState({
      centerCoords: this.getCenterCoords(),
    })
  }

  handleOnKeyUp = event => {
    if (event.keyCode === Keys.ESC) {
      this.stopCrosshair()
    }
  }

  setCoordinates = event => {
    const {x, y} = event

    this.setState({
      x,
      y,
    })
  }

  addSnapshot = () => {
    const {posX, posY, zoomLevel} = this.props
    const {centerCoords, isActive, x, y, snapshots} = this.state

    if (!isActive) return

    const nextX = Math.round(
      centerCoords.x + (x - centerCoords.x) / zoomLevel - posX,
    )
    const nextY = Math.round(
      centerCoords.y + (y - centerCoords.y) / zoomLevel - posY,
    )

    const snap = {
      x: nextX,
      y: nextY,
    }

    if (this.props.onSnapshot) {
      this.props.onSnapshot(snap)
    } else {
      this.setState({
        snapshots: [...snapshots, snap],
      })
    }
  }

  stopCrosshair = () => {
    this.setState({
      isActive: false,
    })
  }

  getLineProps = () => {
    const {color, posX, posY, snapshotOpacity, zoomLevel} = this.props
    const {centerCoords} = this.state

    return {
      centerCoords,
      color,
      posX,
      posY,
      opacity: snapshotOpacity,
      snapshotOpacity,
      zoomLevel,
    }
  }

  renderSnapshots = () => {
    const {showSnapshots} = this.props
    const {snapshots} = this.state

    if (!showSnapshots) return null

    return snapshots.map((snap: Snapshot, index) => {
      const {x, y} = snap

      return (
        <div key={`snap-${index}`}>
          <Line
            {...{
              ...this.getLineProps(),
              className: cx('CrosshairLineXSnap'),
              coordinate: 'x',
              y,
            }}
          />
          <Line
            {...{
              ...this.getLineProps(),
              className: cx('CrosshairLineYSnap'),
              coordinate: 'y',
              x,
            }}
          />
        </div>
      )
    })
  }

  render() {
    const {style} = this.props
    const {x, y, isActive} = this.state

    return (
      <CrosshairUI className={cx('Crosshair')} style={style}>
        {isActive && (
          <div>
            <Line
              {...{
                ...this.getLineProps(),
                className: cx('CrosshairLineX'),
                coordinate: 'x',
                isActive: true,
                y,
                opacity: 1,
                posY: 0,
              }}
            />
            <Line
              {...{
                ...this.getLineProps(),
                className: cx('CrosshairLineY'),
                coordinate: 'y',
                isActive: true,
                x,
                opacity: 1,
                posX: 0,
              }}
            />
          </div>
        )}
        {this.renderSnapshots()}
      </CrosshairUI>
    )
  }
}

const CrosshairUI = styled(Base)`
  pointer-events: none;
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  * {
    pointer-events: none;
  }
`

export default Crosshair
