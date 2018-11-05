import {connect} from 'react-redux'
import {onResize} from '../Artboard.actions'
import Resizer from '../../Resizer'

const mapStateToProps = state => {
  const {
    artboardHeight,
    artboardWidth,
    defaultWidth,
    defaultHeight,
    height,
    width,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    withResponsiveHeight,
    withResponsiveWidth,
  } = state

  console.log(state)

  return {
    defaultWidth,
    defaultHeight,
    height: artboardHeight || height,
    width: artboardWidth || width,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    withResponsiveHeight,
    withResponsiveWidth,
  }
}

const mapDispatchToProps = {
  onResizeStop: onResize,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resizer)
