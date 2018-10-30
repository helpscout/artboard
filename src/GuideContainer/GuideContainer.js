import React from 'react'
import styled from '@helpscout/fancy'
import {getPreparedProps} from '../utils'

class GuideContainer extends React.PureComponent {
  static defaultProps = {
    position: 'relative',
  }

  render() {
    const {children, ...rest} = this.props
    return <GuideContainerUI {...getPreparedProps(rest)} children={children} />
  }
}

const GuideContainerUI = styled('div')(({children, ...props}) => ({
  ...props,
}))

export default GuideContainer
