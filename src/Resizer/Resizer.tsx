import * as React from 'react'
import {ResizableBox} from 'react-resizable'
import styled from '@helpscout/fancy'
import {cx} from '../utils'

export class Resizer extends React.PureComponent<any> {
  static defaultProps = {
    withResponsiveHeight: false,
    withResponsiveWidth: false,
  }

  getResizableProps = () => {
    const {
      defaultHeight,
      defaultWidth,
      children,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      width: widthProp,
      height: heightProp,
      withResponsiveHeight,
      withResponsiveWidth,
      ...rest
    } = this.props

    const minHeightConstraint = minHeight ? minHeight : 1
    const minWidthConstraint = minWidth ? minWidth : 1

    const maxHeightConstraint = maxHeight ? maxHeight : Infinity
    const maxWidthConstraint = maxWidth ? maxWidth : Infinity

    const minConstraints = [minWidthConstraint, minHeightConstraint]
    const maxConstraints = [maxWidthConstraint, maxHeightConstraint]

    const width = widthProp || minWidth || defaultWidth
    const height = heightProp || minHeight || defaultHeight

    return {
      ...rest,
      minConstraints,
      maxConstraints,
      height,
      width,
    }
  }

  render() {
    return (
      <ResizerUI className={cx('ResizerWrapper')}>
        <ResizableBox {...this.getResizableProps()} className={cx('Resizer')}>
          <ContentUI className={cx('ResizerContent')} {...this.props}>
            {this.props.children}
          </ContentUI>
        </ResizableBox>
      </ResizerUI>
    )
  }
}

const ResizerUI = styled('div')`
  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    bottom: -25px;
    box-sizing: border-box;
    cursor: se-resize;
    height: 50px;
    position: absolute;
    right: -25px;
    width: 50px;

    &:before {
      content: '';
      height: 12px;
      width: 12px;
      border-right: 2px solid rgba(0, 0, 0, 0.2);
      border-bottom: 2px solid rgba(0, 0, 0, 0.2);
      position: absolute;
      bottom: 15px;
      right: 15px;
    }
  }
`

const ContentUI = styled('div')`
  position: relative;

  ${({withResponsiveHeight}) =>
    withResponsiveHeight &&
    `
    height: 100%;
  `};

  ${({withResponsiveWidth}) =>
    withResponsiveWidth &&
    `
    width: 100%;
  `};
`

export default Resizer
