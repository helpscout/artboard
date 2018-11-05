import {connect} from 'react-redux'
import SizeInspector from '../../SizeInspector'

const mapStateToProps = state => {
  const {showSizeInspector, zoomLevel} = state

  return {
    showOutlines: showSizeInspector,
    zoomLevel,
  }
}

export default connect(mapStateToProps)(SizeInspector)
