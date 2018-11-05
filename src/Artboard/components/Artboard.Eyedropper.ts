import {connect} from 'react-redux'
import Eyedropper from '../../Eyedropper'
import {readyEyeDropper, stopEyeDropper} from '../Artboard.actions'

const mapStateToProps = state => {
  const {isEyeDropperActive} = state

  return {
    isActive: isEyeDropperActive,
  }
}

const mapDispatchToProps = {
  onReady: readyEyeDropper,
  onStop: stopEyeDropper,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Eyedropper)
