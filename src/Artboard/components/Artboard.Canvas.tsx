import * as React from 'react'
import {connect} from 'react-redux'
import BoxInspector from './Artboard.BoxInspector'
import CanvasContent from './Artboard.CanvasContent'
import GuideProvider from '../../GuideProvider'
import Guides from './Artboard.Guides'
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
    const {children, guides, showGuides, ...rest} = this.props

    return (
      <GuideProvider showGuide={showGuides}>
        <ArtboardUI
          {...rest}
          className={cx('ArtboardCanvas')}
          style={this.getStyles()}
        >
          <CanvasContent>
            <Resizer>
              <BoxInspector>
                <SizeInspector>{children}</SizeInspector>
              </BoxInspector>
            </Resizer>
            <Guides />
          </CanvasContent>
        </ArtboardUI>
      </GuideProvider>
    )
  }
}

const mapStateToProps = state => {
  const {
    isPerformingAction,
    isMoving,
    posX,
    posY,
    showGuides,
    zoomLevel,
  } = state

  return {
    isPerformingAction,
    isMoving,
    posX,
    posY,
    showGuides,
    zoomLevel,
  }
}

export default connect(mapStateToProps)(Canvas)
