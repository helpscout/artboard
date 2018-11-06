import * as React from 'react'
import styled from '@helpscout/fancy'
import Base from '../Base'
import Button from '../Button'
import LabelText from '../LabelText'
import {noop} from '../../utils'

export interface Props {
  children?: any
  onClick: (event: Event) => void
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
          <ButtonWrapperUI>
            <Button {...rest} />
          </ButtonWrapperUI>
          <LabelText>{label}</LabelText>
        </LabelUI>
      </Base>
    )
  }
}

const ButtonWrapperUI = styled('div')`
  margin-bottom: 4px;
`

const LabelUI = styled('label')`
  display: block;
  line-height: 1;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default ButtonControl
