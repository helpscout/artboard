import * as React from 'react'
import styled from '@helpscout/fancy'
import {noop} from '../utils'

export interface Props {
  color: string
  onStartMeasure: () => void
  onMeasure: () => void
  onStopMeasure: () => void
}

export interface State {
  height: number
  isMeasuring: boolean
  width: number
  x: number
  y: number
}

export class Measure extends React.PureComponent<Props, State> {
  static defaultProps = {
    color: 'dodgerblue',
    onStarMeasure: noop,
    onMeasure: noop,
    onStopMeasure: noop,
  }

  node: HTMLElement

  state = {
    isMeasuring: false,
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  }

  componentWillMount() {
    window.addEventListener('mousedown', this.startMeasure)
    window.addEventListener('mousemove', this.measure)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.stopMeasure)
    window.removeEventListener('mousemove', this.measure)
  }

  startMeasure = (event: MouseEvent) => {
    const {x, y} = event

    this.setState({
      isMeasuring: true,
      x,
      y,
    })
  }

  measure = (event: MouseEvent) => {
    if (!this.state.isMeasuring) return
    this.setState({})
  }

  stopMeasure = (event: MouseEvent) => {
    this.setState({
      isMeasuring: false,
    })
  }

  setNodeRef = node => (this.node = node)

  render() {
    return <MeasureUI innerRef={this.setNodeRef} />
  }
}

const MeasureUI = styled('div')`
  position: fixed;
`

export default Measure
