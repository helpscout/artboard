import {connect} from 'react-redux'
import {ContentUI} from '../Artboard.css'

const mapStateToProps = state => {
  const {alignHorizontally, alignVertically} = state

  return {
    alignHorizontally,
    alignVertically,
  }
}

export default connect(mapStateToProps)(ContentUI)
