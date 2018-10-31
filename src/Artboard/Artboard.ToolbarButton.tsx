import * as React from 'react'
import styled from '@helpscout/fancy'
import {cx, noop} from '../utils'
import {darken} from 'polished'
import Icon from '../Icon'

export interface Props {
  label: string
  icon: string
  isActive: boolean
  onClick: () => void
}

export class ToolbarButton extends React.PureComponent<Props> {
  static defaultProps = {
    isActive: true,
    label: 'Action',
    icon: 'Box',
    onClick: noop,
  }

  renderIcon = () => {
    const {icon} = this.props
    const Component = Icon[icon]

    return <Component size="14px" />
  }

  render() {
    const {isActive, label, onClick} = this.props
    return (
      <ToolbarButtonUI className={cx('ToolbarButton')}>
        <ButtonUI onClick={onClick} isActive={isActive}>
          <IconUI>{this.renderIcon()}</IconUI>
        </ButtonUI>
        {label}
      </ToolbarButtonUI>
    )
  }
}

const ToolbarButtonUI = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ButtonUI = styled('button')`
  border-radius: 4px;
  cursor: pointer;
  pointer-events: all;
  margin-bottom: 4px;
  outline: none;

  ${({isActive}) =>
    isActive &&
    `
    background: #3c93f7;
    border-color: ${darken(0.1, '#3c93f7')};
    color: white;
  `};
`

const IconUI = styled('span')`
  padding: 2px 6px;
  display: block;
`

export default ToolbarButton
