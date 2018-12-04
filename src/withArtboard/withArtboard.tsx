import * as React from 'react'
import Artboard from '../Artboard'
import {Props} from '../Artboard/Artboard.types'

export default function withArtboard(props?: Props) {
  return render => {
    return <Artboard {...props}>{render()}</Artboard>
  }
}
