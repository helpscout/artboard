import * as React from 'react'
import styled from '@helpscout/fancy'
import Base from '../UI/Base'

export class KeyboardHints extends React.PureComponent<any> {
  render() {
    return (
      <KeyboardHintsUI>
        <KeyboardHintsActionsUI>
          <div>
            <strong>Alt+D</strong>: Dark Mode
          </div>
          <div>
            <strong>Z</strong>: Zoom In
          </div>
          <div>
            <strong>Alt+Z</strong>: Zoom Out
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
            <strong>Backspace</strong>: Clear Crosshairs
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
  pointer-events: none;
  transform: translateZ(0);
`

const KeyboardHintsActionsUI = styled(Base)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 10px;
  justify-content: center;
  margin-bottom: 5px;

  * {
    margin: 3px 5px;
  }
`

export default KeyboardHints
