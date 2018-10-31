import * as React from 'react'
import styled from '@helpscout/fancy'
import ResizeObserver from 'resize-observer-polyfill'
import GuideContext from '../GuideContext'
import {rgba} from 'polished'
import {getPreparedProps} from '../utils'

type Observable = {
  observe: (node: HTMLElement) => void
  unobserve: (node: HTMLElement) => void
}

export interface State {
  height: number
  width: number
}

class Guide extends React.PureComponent<any, State> {
  static defaultProps = {
    color: '#ec5381',
    opacity: 0.2,
    height: '100%',
    width: 25,
    position: 'absolute',
    showValues: true,
    showGuide: true,
  }

  node: HTMLElement
  resizeObserver: Observable

  constructor(props) {
    super(props)

    this.state = {
      width: props.width,
      height: props.height,
    }

    this.resizeObserver = new ResizeObserver(this.resizeHandler)
  }

  componentDidMount() {
    this.resizeObserver.observe(this.node)
  }

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.node)
  }

  resizeHandler = entries => {
    for (const entry of entries) {
      const {width, height} = entry.contentRect

      this.setState({
        height: Math.round(height),
        width: Math.round(width),
      })
    }
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {children, showGuide, ...rest} = this.props
    const {height, width} = this.state

    if (!showGuide) return null

    return (
      <GuideContext.Consumer>
        {contextProps => {
          const mergedProps = getPreparedProps({...rest, ...contextProps})
          // @ts-ignore
          const {showValues} = mergedProps

          return (
            <GuideUI {...mergedProps} innerRef={this.setNodeRef}>
              {showValues && (
                <div>
                  <HeightUI>
                    <HeightTextUI>{height}</HeightTextUI>
                  </HeightUI>
                  <WidthUI>{width}</WidthUI>
                </div>
              )}
            </GuideUI>
          )
        }}
      </GuideContext.Consumer>
    )
  }
}

const GuideUI = styled('div')(({children, ...props}) => ({
  ...props,
  background: rgba(props.color, props.opacity),
  fontFamily:
    '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
  fontSize: 8,
  lineHeight: 1,
  opacity: 1,
}))

const HeightUI = styled('div')`
  position: absolute;
  top: 0;
  left: 2px;
  height: 100%;
  display: flex;
  min-height: 0;
  align-items: center;
  justify-content: center;
`

const HeightTextUI = styled('div')`
  transform: rotate(-90deg);
`

const WidthUI = styled('div')`
  position: absolute;
  top: 2px;
  width: 100%;
  text-align: center;
`

export default Guide
