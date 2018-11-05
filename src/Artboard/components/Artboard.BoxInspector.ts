import {connect} from 'react-redux'
import BoxInspector from '../../BoxInspector'

const mapStateToProps = state => {
  const {showBoxInspector} = state

  return {
    showOutlines: showBoxInspector,
  }
}

export default connect(mapStateToProps)(BoxInspector)
