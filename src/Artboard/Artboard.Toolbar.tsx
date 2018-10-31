import * as React from 'react'
import styled from '@helpscout/fancy'
import {cx} from '../utils'

export class Toolbar extends React.PureComponent<any> {
  render() {
    return (
      <ToolbarUI className={cx('Toolbar')}>
        <ToolbarContentUI>{this.props.children}</ToolbarContentUI>
      </ToolbarUI>
    )
  }
}

const ToolbarUI = styled('div')`
  align-items: center;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 11px;
  line-height: 1;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  z-index: 999999;
`

const ToolbarContentUI = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;

  * {
    margin: 0 5px;
  }
`

export default Toolbar
