import * as React from 'react'
import ArtboardContext from '../ArtboardContext'
import Artboard from './Artboard'
import {getPreparedProps} from '../utils'
import {defaultProps} from './Artboard.utils'

class ArtboardProvider extends React.PureComponent<any> {
  static defaultProps = defaultProps

  render() {
    const {children, ...rest} = this.props

    return (
      <ArtboardContext.Consumer>
        {contextProps => {
          const mergedProps = getPreparedProps({...rest, ...contextProps})

          return <Artboard {...mergedProps}>{children}</Artboard>
        }}
      </ArtboardContext.Consumer>
    )
  }
}

export default ArtboardProvider
