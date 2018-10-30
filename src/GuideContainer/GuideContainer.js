import React from 'react'
import styled from '@helpscout/fancy'
import {getPreparedProps} from '../utils'

class GuideContainer extends React.PureComponent {
  static defaultProps = {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 1000,
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
