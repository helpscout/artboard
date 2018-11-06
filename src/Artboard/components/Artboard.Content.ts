import {connect} from 'react-redux'
import {ArtboardContentUI} from '../Artboard.css'
import {cx} from '../../utils'

const mapStateToProps = state => {
  const {padding} = state

  return {
    padding,
    className: cx('ArtboardContent'),
  }
}

export default connect(mapStateToProps)(ArtboardContentUI)
