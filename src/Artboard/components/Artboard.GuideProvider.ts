import {connect} from 'react-redux'
import GuideProvider from '../../GuideProvider'

const mapStateToProps = state => {
  const {showGuides} = state

  return {
    showGuide: showGuides,
  }
}

export default connect(mapStateToProps)(GuideProvider)
