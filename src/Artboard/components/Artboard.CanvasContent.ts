import {connect} from 'react-redux'
import {ContentUI} from '../Artboard.css'
import {cx} from '../../utils'

const mapStateToProps = state => {
  const {alignHorizontally, alignVertically} = state

  return {
    alignHorizontally,
    alignVertically,
    className: cx('ArtboardCanvasContent'),
  }
}

export default connect(mapStateToProps)(ContentUI)
