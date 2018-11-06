import * as React from 'react'
import styled from '@helpscout/fancy'
import Base from '../UI/Base'

export class KeyboardHints extends React.PureComponent<any> {
  render() {
    return (
      <KeyboardHintsUI>
        <KeyboardHintsActionsUI>
          <div>
            <strong>⌥+D</strong>: Dark Mode
          </div>
          <div>
            <strong>Z</strong>: Zoom In
          </div>
          <div>
            <strong>⌥+Z</strong>: Zoom Out
          </div>
          <div>
            <strong>Space</strong>: Drag
          </div>
          <div>
            <strong>G</strong>: Guides
          </div>
          <div>
            <strong>B</strong>: Box Inspector
          </div>
          <div>
            <strong>S</strong>: Size Inspector
          </div>
          <div>
            <strong>X</strong>: Crosshair
          </div>
          <div>
            <strong>⌫</strong>: Clear Crosshairs
          </div>
        </KeyboardHintsActionsUI>
      </KeyboardHintsUI>
    )
  }
}

const KeyboardHintsUI = styled(Base)`
  align-items: center;
  display: flex;
  line-height: 1;
  justify-content: center;
  flex-direction: column;
  opacity: 0.3;
  position: absolute;
  left: 10px;
  bottom: 0;
  pointer-events: auto;
  transform: translateZ(0);
`

const KeyboardHintsActionsUI = styled(Base)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 10px;
  justify-content: center;
  margin-bottom: 5px;
  opacity: 0.5;
  transition: opacity 200ms linear;

  &:hover {
    opacity: 1;
  }

  * {
    margin: 3px 5px;
  }
`

export default KeyboardHints
