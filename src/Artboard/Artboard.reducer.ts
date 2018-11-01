import {State, Action} from './Artboard.types'
import ActionTypes from './Artboard.ActionTypes'

export const initialState = {
  artboardHeight: 400,
  artboardWidth: 400,
  isPerformingAction: false,
  isEyeDropperActive: false,
  isKeyDown: false,
  isMoving: undefined,
  isZooming: undefined,
  posX: 0,
  posY: 0,
  showGuides: true,
  showBoxInspector: false,
  withResponsiveHeight: false,
  withResponsiveWidth: false,
  zoomLevel: 1,
}

let _showGuides = initialState.showGuides
let _zoomLevel = initialState.zoomLevel
let _posX = initialState.posX
let _posY = initialState.posY

const ZOOM_LEVEL_MAX = 32
const ZOOM_LEVEL_MIN = 0.125

const reducer = (state: State = initialState, action: Action) => {
  let nextZoom = state.zoomLevel
  switch (action.type) {
    /**
     * GENERAL ACTIONS
     */
    case ActionTypes.PERFORM_ACTION_START:
      return {
        isPerformingAction: true,
      }

    case ActionTypes.PERFORM_ACTION_END:
      return {
        isPerformingAction: false,
      }

    case ActionTypes.RESET:
      return initialState

    /**
     * ZOOM ACTIONS
     */
    case ActionTypes.ZOOM_IN_START:
      return {
        isKeyDown: true,
        isPerformingAction: true,
        isZooming: 'in',
      }

    case ActionTypes.ZOOM_OUT_START:
      return {
        isKeyDown: true,
        isPerformingAction: true,
        isZooming: 'out',
      }

    case ActionTypes.ZOOM_IN:
      nextZoom = state.zoomLevel * 2
      return {
        zoomLevel: nextZoom > ZOOM_LEVEL_MAX ? ZOOM_LEVEL_MAX : nextZoom,
      }

    case ActionTypes.ZOOM_OUT:
      nextZoom = state.zoomLevel / 2
      return {
        zoomLevel: nextZoom < ZOOM_LEVEL_MIN ? ZOOM_LEVEL_MIN : nextZoom,
      }

    case ActionTypes.ZOOM_RESET:
      return {
        isZooming: undefined,
      }

    /**
     * MOVE ACTIONS
     */
    case ActionTypes.MOVE_START:
      return {
        isKeyDown: true,
        isMoving: 'start',
      }

    case ActionTypes.MOVE_DRAG_START:
      return {
        isMoving: 'dragging',
      }

    case ActionTypes.MOVE_DRAG_END:
      return {
        isMoving: 'start',
        isKeyDown: false,
      }

    case ActionTypes.MOVE_DRAG:
      return {
        isMoving: 'dragging',
        posX: state.posX + (action.payload.posX * 1) / state.zoomLevel,
        posY: state.posY + (action.payload.posY * 1) / state.zoomLevel,
      }

    case ActionTypes.MOVE_END:
      return {
        isMoving: undefined,
      }

    /**
     * RESIZE ACTIONS
     */
    case ActionTypes.RESIZE_ARTBOARD:
      return {
        artboardWidth: action.payload.artboardWidth,
        artboardHeight: action.payload.artboardHeight,
      }

    /**
     * TOOLBAR ACTIONS
     */
    case ActionTypes.TOGGLE_GUIDES:
      return {
        showGuides: !state.showGuides,
      }

    case ActionTypes.TOGGLE_BOX_INSPECTOR:
      return {
        showBoxInspector: !state.showBoxInspector,
      }

    case ActionTypes.EYEDROPPER_START:
      _posX = state.posX
      _posY = state.posY
      _showGuides = state.showGuides
      _zoomLevel = state.zoomLevel

      return {
        isEyeDropperActive: true,
        posX: 0,
        posY: 0,
        showGuides: false,
        zoomLevel: 1,
      }

    case ActionTypes.EYEDROPPER_READY:
      return {}

    case ActionTypes.EYEDROPPER_STOP:
      return {
        isEyeDropperActive: false,
        posX: _posX,
        posY: _posY,
        showGuides: _showGuides,
        zoomLevel: _zoomLevel,
      }

    default:
      return {}
  }
}

export default reducer
