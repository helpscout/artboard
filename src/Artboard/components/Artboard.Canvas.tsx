import * as React from 'react'
import {connect} from 'react-redux'
import CanvasContent from './Artboard.CanvasContent'
import BoxInspector from './Artboard.BoxInspector'
import Resizer from './Artboard.Resizer'
import SizeInspector from './Artboard.SizeInspector'

import {ArtboardUI} from '../Artboard.css'
import {cx} from '../../utils/index'

export class Canvas extends React.PureComponent<any> {
  getStyles = () => {
    const {posX, posY, zoomLevel} = this.props

    return {
      transform: `scale(${zoomLevel}) translate(${posX}px, ${posY}px)`,
    }
  }

  render() {
    const {children, guides, ...rest} = this.props

    return (
      <ArtboardUI {...rest} className={cx('Artboard')} style={this.getStyles()}>
        <CanvasContent>
          <Resizer>
            <BoxInspector>
              <SizeInspector>{children}</SizeInspector>
            </BoxInspector>
          </Resizer>
          {guides}
        </CanvasContent>
      </ArtboardUI>
    )
  }
}

const mapStateToProps = state => {
  const {isPerformingAction, isMoving, posX, posY, zoomLevel} = state

  return {
    isPerformingAction,
    isMoving,
    posX,
    posY,
    zoomLevel,
  }
}

export default connect(mapStateToProps)(Canvas)
