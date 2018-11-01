import * as React from 'react'
import styled from '@helpscout/fancy'
import Base from '../Base'
import Button from '../Button'
import {noop} from '../../utils'

export interface Props {
  children?: any
  onClick: () => void
  isActive: boolean
  icon?: string
  label: string
}

export class ButtonControl extends React.PureComponent<Props> {
  static defaultProps = {
    label: 'Label',
    isActive: false,
    onClick: noop,
  }

  render() {
    const {label, ...rest} = this.props
    return (
      <Base>
        <LabelUI>
          <Button {...rest} />
          <LabelTextUI>{label}</LabelTextUI>
        </LabelUI>
      </Base>
    )
  }
}

const LabelUI = styled('label')`
  display: block;
  margin: 0;
  padding: 0;
  text-align: center;
`

const LabelTextUI = styled('div')`
  padding: 8px;
`

export default ButtonControl
