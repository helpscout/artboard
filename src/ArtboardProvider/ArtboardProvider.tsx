import * as React from 'react'
import ArtboardContext from '../ArtboardContext'

class ArtboardProvider extends React.PureComponent<any> {
  render() {
    const {children, ...rest} = this.props

    return (
      <ArtboardContext.Consumer>
        {contextProps => {
          const mergedProps = {
            ...contextProps,
            ...rest,
          }

          return (
            <ArtboardContext.Provider value={mergedProps}>
              {children}
            </ArtboardContext.Provider>
          )
        }}
      </ArtboardContext.Consumer>
    )
  }
}

export default ArtboardProvider
