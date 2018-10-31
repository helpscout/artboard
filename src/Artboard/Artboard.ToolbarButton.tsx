import * as React from 'react'
import styled from '@helpscout/fancy'
import {cx, noop} from '../utils'
import {darken} from 'polished'

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
    icon: '🎬',
    onClick: noop,
  }

  render() {
    const {isActive, icon, label, onClick} = this.props
    return (
      <ToolbarButtonUI className={cx('ToolbarButton')}>
        <ButtonUI onClick={onClick} isActive={isActive}>
          <IconUI>{icon}</IconUI>
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
  pointer-events: all;
  margin-bottom: 4px;
  outline: none;

  ${({isActive}) =>
    isActive &&
    `
    background: #3c93f7;
    border-color: ${darken(0.1, '#3c93f7')};
  `};
`

const IconUI = styled('span')`
  padding-left: 3px;
  display: block;
`

export default ToolbarButton
