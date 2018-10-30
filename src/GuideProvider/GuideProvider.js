import React from 'react'
import GuideContext from '../GuideContext'

class GuideProvider extends React.PureComponent {
  render() {
    const {children, ...rest} = this.props

    return (
      <GuideContext.Provider value={rest}>{children}</GuideContext.Provider>
    )
  }
}

export default GuideProvider
