import ActionTypes from './Artboard.ActionTypes'

export const initialState = {
  artboardName: '',
  artboardHeight: 400,
  artboardWidth: 400,
  darkMode: false,
  guides: [],
  id: undefined,
  initialProps: {},
  isPerformingAction: false,
  isCrosshairActive: false,
  isEyeDropperActive: false,
  isKeyDown: false,
  isMoving: undefined,
  isZooming: undefined,
  height: undefined,
  name: undefined,
  width: undefined,
  minWidth: undefined,
  minHeight: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
  padding: 0,
  posX: 0,
  posY: 0,
  showGuides: true,
  showBoxInspector: false,
  showSizeInspector: false,
  showSnapshots: true,
  withCenterGuides: true,
  withResponsiveHeight: false,
  withResponsiveWidth: false,
  snapshots: [],
  zoomLevel: 1,
}

let _showGuides = initialState.showGuides
let _showSnapshots = initialState.showSnapshots
let _showBoxInspector = initialState.showBoxInspector
let _showSizeInspector = initialState.showSizeInspector
let _zoomLevel = initialState.zoomLevel
let _posX = initialState.posX
let _posY = initialState.posY
let initialProps = {}

const ZOOM_LEVEL_MAX = 32
const ZOOM_LEVEL_MIN = 0.125

const reducer = (state = initialState, action) => {
  let nextZoom = state.zoomLevel
  switch (action.type) {
    /**
     * GENERAL ACTIONS
     */
    case ActionTypes.ON_READY:
      initialProps = action.payload.props
      return {
        ...state,
        artboardHeight: null,
        artboardWidth: null,
        ...initialProps,
      }

    case ActionTypes.LOAD_LOCAL_STATE:
      return {
        ...state,
        ...action.payload.state,
      }

    case ActionTypes.PERFORM_ACTION_START:
      return {
        ...state,
        isPerformingAction: true,
      }

    case ActionTypes.PERFORM_ACTION_END:
      return {
        ...state,
        isPerformingAction: false,
      }

    case ActionTypes.RESET:
      return {
        ...initialState,
        ...initialProps,
        darkMode: state.darkMode,
      }

    case ActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      }

    /**
     * ZOOM ACTIONS
     */
    case ActionTypes.ZOOM_IN_START:
      return {
        ...state,
        isKeyDown: true,
        isPerformingAction: true,
        isZooming: 'in',
      }

    case ActionTypes.ZOOM_OUT_START:
      return {
        ...state,
        isKeyDown: true,
        isPerformingAction: true,
        isZooming: 'out',
      }

    case ActionTypes.ZOOM_IN:
      nextZoom = state.zoomLevel * 2
      return {
        ...state,
        zoomLevel: nextZoom > ZOOM_LEVEL_MAX ? ZOOM_LEVEL_MAX : nextZoom,
      }

    case ActionTypes.ZOOM_OUT:
      nextZoom = state.zoomLevel / 2
      return {
        ...state,
        zoomLevel: nextZoom < ZOOM_LEVEL_MIN ? ZOOM_LEVEL_MIN : nextZoom,
      }

    case ActionTypes.ZOOM_RESET:
      return {
        ...state,
        isZooming: undefined,
      }

    /**
     * MOVE ACTIONS
     */
    case ActionTypes.MOVE_START:
      return {
        ...state,
        isKeyDown: true,
        isPerformingAction: true,
        isMoving: 'start',
      }

    case ActionTypes.MOVE_DRAG_START:
      return {
        ...state,
        isMoving: 'dragging',
      }

    case ActionTypes.MOVE_DRAG_END:
      return {
        ...state,
        isMoving: 'start',
        isKeyDown: false,
      }

    case ActionTypes.MOVE_DRAG:
      return {
        ...state,
        isMoving: 'dragging',
        posX: Math.round(
          state.posX + (action.payload.posX * 1) / state.zoomLevel,
        ),
        posY: Math.round(
          state.posY + (action.payload.posY * 1) / state.zoomLevel,
        ),
      }

    case ActionTypes.MOVE_END:
      return {
        ...state,
        isMoving: undefined,
      }

    /**
     * RESIZE ACTIONS
     */
    case ActionTypes.RESIZE_ARTBOARD:
      return {
        ...state,
        artboardWidth: action.payload.artboardWidth,
        artboardHeight: action.payload.artboardHeight,
      }

    /**
     * TOOLBAR ACTIONS
     */
    case ActionTypes.TOGGLE_GUIDES:
      return {
        ...state,
        showGuides: !state.showGuides,
      }

    case ActionTypes.TOGGLE_BOX_INSPECTOR:
      return {
        ...state,
        showBoxInspector: !state.showBoxInspector,
      }

    case ActionTypes.TOGGLE_SIZE_INSPECTOR:
      return {
        ...state,
        showSizeInspector: !state.showSizeInspector,
      }

    case ActionTypes.EYEDROPPER_START:
      _posX = state.posX
      _posY = state.posY
      _showGuides = state.showGuides
      _showSnapshots = state.showSnapshots
      _showBoxInspector = state.showBoxInspector
      _zoomLevel = state.zoomLevel

      return {
        ...state,
        isCrosshairActive: false,
        isEyeDropperActive: true,
        isPerformingAction: true,
        posX: 0,
        posY: 0,
        showGuides: false,
        showSnapshots: false,
        showBoxInspector: false,
        zoomLevel: 1,
      }

    case ActionTypes.EYEDROPPER_READY:
      return {
        ...state,
        isPerformingAction: true,
      }

    case ActionTypes.EYEDROPPER_STOP:
      return {
        ...state,
        isEyeDropperActive: false,
        isPerformingAction: false,
        posX: _posX,
        posY: _posY,
        showGuides: _showGuides,
        showBoxInspector: _showBoxInspector,
        showSnapshots: _showSnapshots,
        zoomLevel: _zoomLevel,
      }

    case ActionTypes.CROSSHAIR_START:
      _showBoxInspector = state.showBoxInspector
      _showSizeInspector = state.showSizeInspector
      return {
        ...state,
        isCrosshairActive: true,
        showSnapshots: true,
        showBoxInspector: false,
        showSizeInspector: false,
      }

    case ActionTypes.CROSSHAIR_END:
      return {
        ...state,
        isCrosshairActive: false,
        showBoxInspector: _showBoxInspector,
        showSizeInspector: _showSizeInspector,
      }

    case ActionTypes.CROSSHAIR_ADD_SNAPSHOT:
      return {
        ...state,
        snapshots: [...state.snapshots, action.payload.snapshot],
      }

    case ActionTypes.CROSSHAIR_SHOW_SNAPSHOTS:
      return {
        ...state,
        showSnapshots: true,
      }

    case ActionTypes.CROSSHAIR_HIDE_SNAPSHOTS:
      return {
        ...state,
        showSnapshots: false,
      }

    case ActionTypes.CROSSHAIR_CLEAR:
      return {
        ...state,
        snapshots: [],
      }

    default:
      return state
  }
}

export default reducer
