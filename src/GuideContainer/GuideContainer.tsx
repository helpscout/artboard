import * as React from 'react'
import styled from '@helpscout/fancy'
import classNames from '@helpscout/react-utils/dist/classNames'
import {cx, getPreparedProps} from '../utils'

class GuideContainer extends React.PureComponent<any> {
  static defaultProps = {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  }

  render() {
    const {className, children, ...rest} = this.props
    return (
      <GuideContainerUI
        {...getPreparedProps(rest)}
        children={children}
        className={classNames(cx('GuideContainer'), className)}
      />
    )
  }
}

const GuideContainerUI = styled('div')(({children, ...props}) => ({
  ...props,
}))

export default GuideContainer
