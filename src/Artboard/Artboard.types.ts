export interface Props {
  __debug: boolean
  alignHorizontally: 'left' | 'center' | 'right'
  alignVertically: 'top' | 'middle' | 'bottom'
  defaultHeight: number
  defaultWidth: number
  darkMode: boolean
  guides: any
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  maxHeight?: number
  maxWidth?: number
  posX: number
  posY: number
  withResponsiveHeight: boolean
  withResponsiveWidth: boolean
  withCrosshair: boolean
  zoomLevel: number
}

export interface State {
  isPerformingAction: boolean
  isKeyDown: boolean
  isMoving: 'start' | 'dragging' | undefined
  isZooming: 'in' | 'out' | undefined
  showGuides: boolean
  showBoxInspector: boolean
  posX: number
  posY: number
  zoomLevel: number
}

export type Action = {
  type: string
  payload?: any
}
