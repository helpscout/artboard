import * as React from 'react'
import GuideContext from '../GuideContext'

class GuideProvider extends React.PureComponent<any> {
  render() {
    const {children, ...rest} = this.props

    return (
      <GuideContext.Consumer>
        {contextProps => {
          const mergedProps = {
            ...contextProps,
            ...rest,
          }

          return (
            <GuideContext.Provider value={mergedProps}>
              {children}
            </GuideContext.Provider>
          )
        }}
      </GuideContext.Consumer>
    )
  }
}

export default GuideProvider
