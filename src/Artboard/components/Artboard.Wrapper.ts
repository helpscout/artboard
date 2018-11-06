import {connect} from 'react-redux'
import {ArtboardWrapperUI} from '../Artboard.css'
import {cx} from '../../utils'

const mapStateToProps = state => {
  const {id, isMoving, isZooming} = state

  return {
    className: cx('ArtboardWrapper'),
    id,
    isMoving,
    isZooming,
  }
}

export default connect(mapStateToProps)(ArtboardWrapperUI)
