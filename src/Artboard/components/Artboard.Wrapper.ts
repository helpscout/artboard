import {connect} from 'react-redux'
import {ArtboardWrapperUI} from '../Artboard.css'
import {cx} from '../../utils'

const mapStateToProps = state => {
  const {isMoving, isZooming} = state

  return {
    className: cx('ArtboardWrapper'),
    isMoving,
    isZooming,
  }
}

export default connect(mapStateToProps)(ArtboardWrapperUI)
