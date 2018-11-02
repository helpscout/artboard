import * as React from 'react'
import styled from '@helpscout/fancy'
import Base from '../UI/Base'
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

const ToolbarUI = styled(Base)`
  align-items: center;
  display: flex;
  line-height: 1;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  z-index: 999999;
`

const ToolbarContentUI = styled('div')`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;

  > * {
    margin: 0 10px;
  }
`

export default Toolbar
