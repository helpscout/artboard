import * as React from 'react'
import {connect} from 'react-redux'
import {toggleGuides} from '../actions'

export class Toolbar extends React.PureComponent<any> {
  render() {
    const {toggleGuides} = this.props

    return (
      <div>
        <button onClick={toggleGuides}>GOGO</button>
      </div>
    )
  }
}

export default connect(
  null,
  {toggleGuides},
)(Toolbar)
