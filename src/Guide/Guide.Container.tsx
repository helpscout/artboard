import * as React from 'react'
import GuideContext from '../GuideContext'
import {getPreparedProps} from '../utils'

class GuideContainer extends React.PureComponent<any> {
  render() {
    const {children, ...rest} = this.props

    return (
      <GuideContext.Consumer>
        {contextProps => {
          const mergedProps = getPreparedProps({...rest, ...contextProps})
          // @ts-ignore
          const {showGuide} = mergedProps

          if (!showGuide) return <div />

          return <div>{children}</div>
        }}
      </GuideContext.Consumer>
    )
  }
}

export default GuideContainer
