import * as React from 'react'
import styled from '@helpscout/fancy'
import Line from './Crosshair.Line'
import Base from '../UI/Base'
import {cx, Keys} from '../utils'

export type Snapshot = {
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
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.setCoordinates)
    window.removeEventListener('click', this.addSnapshot)
    window.removeEventListener('keyup', this.stopCrosshair)
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
    const {posX, posY} = this.props
    const {isActive, x, y, snapshots} = this.state

    if (!isActive) return

    const snap = {
      x: x - posX,
      y: y - posY,
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

  renderSnapshots = () => {
    const {
      color,
      posX,
      posY,
      showSnapshots,
      snapshotOpacity,
      zoomLevel,
    } = this.props
    const {snapshots} = this.state

    if (!showSnapshots) return null

    return snapshots.map((snap: Snapshot, index) => {
      const {x, y} = snap

      return (
        <div key={`snap-${index}`}>
          <Line
            color={color}
            className={cx('CrosshairLineXSnap')}
            y={y}
            posY={posY}
            coordinate="x"
            opacity={snapshotOpacity}
            zoomLevel={zoomLevel}
          />
          <Line
            color={color}
            className={cx('CrosshairLineYSnap')}
            x={x}
            posX={posX}
            coordinate="y"
            opacity={snapshotOpacity}
            zoomLevel={zoomLevel}
          />
        </div>
      )
    })
  }

  render() {
    const {color, style} = this.props
    const {x, y, isActive} = this.state

    return (
      <CrosshairUI className={cx('Crosshair')} style={style}>
        {isActive && (
          <div>
            <Line
              color={color}
              className={cx('CrosshairLineX')}
              y={y}
              posY={0}
              coordinate="x"
            />
            <Line
              color={color}
              className={cx('CrosshairLineY')}
              x={x}
              posX={0}
              coordinate="y"
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
