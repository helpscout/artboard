import React from 'react'
import styled from '@helpscout/fancy'
import GuideContext from '../GuideContext'
import {rgba} from 'polished'
import {getPreparedProps} from '../utils'

class Guide extends React.PureComponent {
  static defaultProps = {
    color: '#ec5381',
    opacity: 0.2,
    height: '100%',
    width: 25,
    position: 'absolute',
    top: 0,
    left: 0,
    showValues: true,
    showGuide: true,
  }

  render() {
    const {children, showGuide, ...rest} = this.props

    if (!showGuide) return null

    return (
      <GuideContext.Consumer>
        {contextProps => {
          const mergedProps = getPreparedProps({...rest, ...contextProps})
          const {height, showValues, width} = mergedProps

          return (
            <GuideUI {...mergedProps}>
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
  transform-origin: left top 0;
`

const WidthUI = styled('div')`
  position: absolute;
  top: 2px;
  width: 100%;
  text-align: center;
`

export default Guide
