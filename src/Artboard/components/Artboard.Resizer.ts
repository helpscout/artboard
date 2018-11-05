import {connect} from 'react-redux'
import {onResize} from '../actions'
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
  onResize,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resizer)
