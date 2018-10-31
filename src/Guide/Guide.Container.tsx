import * as React from 'react'
import GuideContext from '../GuideContext'
import {getPreparedProps} from '../utils'
import {defaultProps} from './Guide.utils'

class GuideContainer extends React.PureComponent<any> {
  static defaultProps = defaultProps

  render() {
    const {children, ...rest} = this.props

    return (
      <GuideContext.Consumer>
        {contextProps => {
          const mergedProps = getPreparedProps({...rest, ...contextProps})
          // @ts-ignore
          const {showGuide} = mergedProps

          if (!showGuide) return <div />

          return children
        }}
      </GuideContext.Consumer>
    )
  }
}

export default GuideContainer
