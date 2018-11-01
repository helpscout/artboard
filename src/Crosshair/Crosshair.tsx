import * as React from 'react'
import styled from '@helpscout/fancy'
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
  showSnapshots: boolean
  snapshotOpacity: number
  snapshots: Snapshots
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
    snapshots: [],
    snapshotOpacity: 0.4,
    showSnapshots: true,
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
    const {isActive, x, y, snapshots} = this.state

    if (!isActive) return

    const snap = {
      x,
      y,
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
    const {color, showSnapshots, snapshotOpacity} = this.props
    const {snapshots} = this.state

    if (!showSnapshots) return null

    return snapshots.map((snap: Snapshot, index) => {
      const {x, y} = snap

      return (
        <div key={`snap-${index}`}>
          <LineXUI
            color={color}
            className={cx('CrosshairLineXSnap')}
            y={y}
            opacity={snapshotOpacity}
          />
          <LineYUI
            color={color}
            className={cx('CrosshairLineYSnap')}
            x={x}
            opacity={snapshotOpacity}
          />
        </div>
      )
    })
  }

  render() {
    const {color} = this.props
    const {x, y, isActive} = this.state

    return (
      <CrosshairUI className={cx('Crosshair')}>
        {isActive && (
          <div>
            <LineXUI color={color} className={cx('CrosshairLineX')} y={y} />
            <LineYUI color={color} className={cx('CrosshairLineY')} x={x} />
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

const LineBaseUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;

  &:before {
    color: currentColor;
    font-size: 11px;
    padding-top: 2px;
    padding-left: 2px;
    will-change: contents;
  }

  ${({color}) => `
    color: ${color};
    background-color: currentColor;
  `};

  ${({opacity}) => `
    opacity: ${opacity};
  `};
`

LineBaseUI.defaultProps = {
  opacity: 1,
}

const LineXUI = styled(LineBaseUI)`
  width: 100%;
  height: 1px;

  ${({y}) => `
    transform: translateY(${y}px);

    &:before {
      content: "${y}px";
    }
  `};
`

const LineYUI = styled(LineBaseUI)`
  height: 100%;
  width: 1px;

  ${({x}) => `
    transform: translateX(${x}px);

    &:before {
      content: "${x}px";
    }
  `};
`

export default Crosshair
