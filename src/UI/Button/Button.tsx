import * as React from 'react'
import styled from '@helpscout/fancy'
import {darken, lighten} from 'polished'
import Icon from '../Icon'
import {noop} from '../../utils'

export class Button extends React.PureComponent<any> {
  static defaultProps = {
    isActive: false,
    icon: undefined,
    onClick: noop,
  }

  renderContent = () => {
    const {children, icon} = this.props

    if (icon && Icon[icon]) {
      const IconComponent = Icon[icon]
      return <IconComponent size="18px" />
    }

    return children
  }

  render() {
    return <ButtonUI {...this.props}>{this.renderContent()}</ButtonUI>
  }
}

const ButtonUI = styled('button')`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 11px;

  appearance: none;
  display: inline-block;
  padding: 3px 8px;
  margin-bottom: 0;
  line-height: 1.4;
  white-space: nowrap;
  background-image: none;
  border: 1px solid #0000;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  color: #333;
  background-color: #fcfcfc;
  background-image: linear-gradient(to bottom, #fcfcfc 0, #f1f1f1 100%);
  border-color: #c2c0c2 #c2c0c2 #a19fa1;
  outline: none;

  &:active {
    background-color: #ddd;
    background-image: none;
  }

  ${({theme}) =>
    theme.darkMode &&
    `
    background-color: #232223;
    background-image: none;
    border-color: #000;
    color: white;

    &:active {
      background-color: #2b2a2b;
    }
  `};

  ${({isActive}) =>
    isActive &&
    `
    background-color: #3c93f7;
    background-image: linear-gradient(to bottom, ${lighten(
      0.05,
      '#3c93f7',
    )} 0, #3c93f7 100%);
    background-image: none;
    border-color: #0b78f5 #0b78f5 ${darken(0.05, '#0b78f5')};
    color: white;

    &:active {
      background-color: ${darken(0.05, '#3c93f7')};
      color: white;
    }
  `};
`

export default Button
