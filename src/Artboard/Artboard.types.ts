import {Snapshots} from '../Crosshair/Crosshair'

export interface Props {
  __debug: boolean
  alignHorizontally: 'left' | 'center' | 'right'
  alignVertically: 'top' | 'middle' | 'bottom'
  defaultHeight: number
  defaultWidth: number
  darkMode: boolean
  guides?: any
  id?: string
  name?: string
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  maxHeight?: number
  maxWidth?: number
  padding: number
  posX: number
  posY: number
  snapshots: Snapshots
  withResponsiveHeight: boolean
  withResponsiveWidth: boolean
  withCenterGuides: boolean
  zoomLevel: number
}

export interface State {
  artboardName: string
  artboardHeight: number
  artboardWidth: number
  darkMode: boolean
  guides?: any
  isPerformingAction: boolean
  isCrosshairActive: boolean
  isEyeDropperActive: boolean
  isKeyDown: boolean
  isMoving: 'start' | 'dragging' | undefined
  isZooming: 'in' | 'out' | undefined
  showGuides: boolean
  showBoxInspector: boolean
  showSizeInspector: boolean
  showSnapshots: boolean
  snapshots: Snapshots
  posX: number
  posY: number
  zoomLevel: number
}

export type Action = {
  type: string
  payload?: any
}
