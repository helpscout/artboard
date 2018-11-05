import {connect} from 'react-redux'
import Crosshair from '../../Crosshair'
import {addCrosshairSnapshot} from '../Artboard.actions'

const mapStateToProps = state => {
  const {
    isCrosshairActive,
    showSnapshots,
    snapshots,
    posX,
    posY,
    zoomLevel,
  } = state

  return {
    isActive: isCrosshairActive,
    showSnapshots,
    snapshots,
    posX,
    posY,
    zoomLevel,
  }
}

const mapDispatchToProps = {
  onSnapshot: addCrosshairSnapshot,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Crosshair)
