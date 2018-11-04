import * as React from 'react'
import styled from '@helpscout/fancy'
import classNames from '@helpscout/react-utils/dist/classNames'
import ResizeObserver from 'resize-observer-polyfill'
import GuideContext from '../GuideContext'
import Container from './Guide.Container'
import {rgba} from 'polished'
import {cx, getPreparedProps} from '../utils'
import {defaultProps} from './Guide.utils'

type Observable = {
  observe: (node: HTMLElement) => void
  unobserve: (node: HTMLElement) => void
}

export interface State {
  height: number
  width: number
}

class Guide extends React.PureComponent<any, State> {
  static defaultProps = defaultProps

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
    if (this.node) {
      this.resizeObserver.observe(this.node)
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.resizeObserver.unobserve(this.node)
    }
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
    const {className, children, showGuide, ...rest} = this.props
    const {height, width} = this.state

    return (
      <GuideContext.Consumer>
        {contextProps => {
          const mergedProps = getPreparedProps({...rest, ...contextProps})
          // @ts-ignore
          const {showValues} = mergedProps

          return (
            <GuideUI
              {...mergedProps}
              innerRef={this.setNodeRef}
              className={classNames(cx('Guide'), className)}
            >
              {showValues && (
                <div className={cx('Guide__sizeWrapper')}>
                  <HeightUI className={cx('Guide__height')}>
                    <HeightTextUI>{height}</HeightTextUI>
                  </HeightUI>
                  <WidthUI className={cx('Guide__width')}>{width}</WidthUI>
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
  '*': {
    pointerEvents: 'none',
  },
  willChange: 'width, height',
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
  will-change: contents;
`

const WidthUI = styled('div')`
  position: absolute;
  top: 2px;
  width: 100%;
  text-align: center;
  will-change: contents;
`

const connectedGuide = props => (
  <Container {...props}>
    <Guide {...props} />
  </Container>
)

export default connectedGuide
