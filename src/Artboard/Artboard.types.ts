export interface Props {
  __debug: boolean
  alignHorizontally: 'left' | 'center' | 'right'
  alignVertically: 'top' | 'middle' | 'bottom'
  defaultHeight: number
  defaultWidth: number
  darkMode: boolean
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  maxHeight?: number
  maxWidth?: number
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
