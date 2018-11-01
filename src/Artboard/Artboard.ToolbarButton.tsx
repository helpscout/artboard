import * as React from 'react'
import styled from '@helpscout/fancy'
import {cx, noop} from '../utils'
import Base from '../UI/Base'
import ButtonControl from '../UI/ButtonControl'

export interface Props {
  label: string
  icon: string
  isActive: boolean
  onClick: (event: Event) => void
}

export class ToolbarButton extends React.PureComponent<Props> {
  static defaultProps = {
    isActive: false,
    label: 'Action',
    icon: 'Box',
    onClick: noop,
  }

  render() {
    const {isActive, label, icon, onClick} = this.props
    return (
      <ToolbarButtonUI className={cx('ToolbarButton')}>
        <ButtonUI>
          <ButtonControl
            onClick={onClick}
            isActive={isActive}
            icon={icon}
            label={label}
          />
        </ButtonUI>
      </ToolbarButtonUI>
    )
  }
}

const ToolbarButtonUI = styled(Base)`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 70px;
`

const ButtonUI = styled('div')`
  pointer-events: auto;

  * {
    pointer-events: auto;
  }
`

export default ToolbarButton
