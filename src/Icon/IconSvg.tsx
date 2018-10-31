import * as React from 'react'
import Svg from './Svg'

const IconSvg = props => <Svg {...props} />

IconSvg.defaultProps = {
  size: '16px',
}

export default IconSvg
