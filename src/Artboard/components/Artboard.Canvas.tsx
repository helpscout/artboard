import * as React from 'react'
import {connect} from 'react-redux'
import BoxInspector from './Artboard.BoxInspector'
import CanvasContent from './Artboard.CanvasContent'
import Content from './Artboard.Content'
import GuideProvider from './Artboard.GuideProvider'
import Guides from './Artboard.Guides'
import Resizer from './Artboard.Resizer'
import SizeInspector from './Artboard.SizeInspector'
import {ArtboardUI, ArtboardBodyUI} from '../Artboard.css'
import {cx} from '../../utils/index'

export class Canvas extends React.PureComponent<any> {
  node: HTMLElement

  componentDidMount() {
    this.updateNodeStylesFromProps(this.props)
  }

  shouldComponentUpdate(nextProps) {
    // Performantly re-render the UI
    this.updateNodeStylesFromProps(nextProps)

    if (nextProps.isPerformingAction !== this.props.isPerformingAction) {
      return true
    }
    if (nextProps.children !== this.props.children) {
      return true
    }

    return false
  }

  updateNodeStylesFromProps = nextProps => {
    const {isMoving, posX, posY, zoomLevel} = nextProps

    if (!this.node) return

    let transition = 'background 200ms linear, transform 200ms ease'
    if (isMoving) {
      transition = 'none'
    }

    this.node.style.transform = `scale(${zoomLevel}) translate(${posX}px, ${posY}px)`
    this.node.style.transition = transition
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {children, isPerformingAction} = this.props

    return (
      <GuideProvider>
        <ArtboardUI
          className={cx('ArtboardCanvas')}
          innerRef={this.setNodeRef}
          isPerformingAction={isPerformingAction}
        >
          <CanvasContent>
            <Resizer>
              <Content>
                <ArtboardBodyUI>
                  <BoxInspector>
                    <SizeInspector>{children}</SizeInspector>
                  </BoxInspector>
                </ArtboardBodyUI>
              </Content>
            </Resizer>
            <Guides />
          </CanvasContent>
        </ArtboardUI>
      </GuideProvider>
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
