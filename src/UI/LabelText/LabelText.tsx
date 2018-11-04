import styled from '@helpscout/fancy'
import {rgba} from 'polished'
import Base from '../Base'

const LabelTextUI = styled(Base)`
  background: rgba(0, 0, 0, 0);
  border-radius: 4px;
  padding: 2px 8px;
  transition: background 200ms linear;

  ${({theme}) =>
    theme.darkMode &&
    `
    background: ${rgba('#1d1a1d', 0.6)};
  `};
`

export default LabelTextUI
