import ActionTypes from './Artboard.ActionTypes'
import store from './Artboard.store'
import {
  getArtboardNameFromProps,
  loadSessionState,
  saveSessionState,
} from './Artboard.utils'

/**
 * GENERAL
 */
export const onReady = props => {
  const state = store.getState()
  const mergedProps = mergePropsWithState(props, state)

  return {
    type: ActionTypes.ON_READY,
    payload: {props: mergedProps},
  }
}

export const loadLocalState = props => {
  const state = store.getState()
  const artboardName = getArtboardNameFromProps(props)
  const localState = loadSessionState(artboardName)

  const {
    darkMode,
    posX,
    posY,
    showGuides,
    showBoxInspector,
    width,
    height,
    snapshots,
    zoomLevel,
  } = props

  const mergedState = {
    ...state,
    darkMode,
    posX,
    posY,
    showGuides,
    showBoxInspector,
    snapshots,
    zoomLevel,
    artboardHeight: height,
    artboardWidth: width,
    ...localState,
  }

  return {
    type: ActionTypes.LOAD_LOCAL_STATE,
    payload: {state: mergedState},
  }
}

export const saveLocalState = () => {
  const state = store.getState()
  const {artboardName} = state

  if (artboardName) {
    saveSessionState(artboardName, state)
    return {
      type: ActionTypes.SAVE_LOCAL_STATE,
    }
  } else {
    return {
      type: ActionTypes.NULL,
    }
  }
}

export const resetSettings = initialProps => {
  return {
    type: ActionTypes.RESET,
    payload: {
      props: initialProps,
    },
  }
}

export const performActionStart = () => {
  return {
    type: ActionTypes.PERFORM_ACTION_START,
  }
}

export const performActionEnd = () => {
  return {
    type: ActionTypes.PERFORM_ACTION_END,
  }
}

/**
 * DARK MODE
 */

export const toggleDarkMode = () => {
  return {type: ActionTypes.TOGGLE_DARK_MODE}
}

/**
 * INTERFACE
 */

export const toggleInterface = () => {
  return {type: ActionTypes.TOGGLE_INTERFACE}
}

/**
 * GUIDES
 */

export const toggleGuides = () => {
  return {type: ActionTypes.TOGGLE_GUIDES}
}

/**
 * BOX INSPECTOR
 */

export const toggleBoxInspector = () => {
  return {type: ActionTypes.TOGGLE_BOX_INSPECTOR}
}

/**
 * SIZE INSPECTOR
 */

export const toggleSizeInspector = () => {
  return {type: ActionTypes.TOGGLE_SIZE_INSPECTOR}
}

/**
 * EYEDROPPER
 */
export const startEyeDropper = () => {
  return {type: ActionTypes.EYEDROPPER_START}
}

export const readyEyeDropper = () => {
  return {type: ActionTypes.EYEDROPPER_READY}
}

export const stopEyeDropper = () => {
  return {type: ActionTypes.EYEDROPPER_STOP}
}

/**
 * CROSSHAIR
 */

export const startCrosshair = () => {
  return {type: ActionTypes.CROSSHAIR_START}
}

export const stopCrosshair = () => {
  return {type: ActionTypes.CROSSHAIR_END}
}

export const toggleCrosshair = () => {
  const state = store.getState()

  if (state.isCrosshairActive) {
    return stopCrosshair()
  } else {
    return startCrosshair()
  }
}

export const addCrosshairSnapshot = snapshot => {
  return {
    type: ActionTypes.CROSSHAIR_ADD_SNAPSHOT,
    payload: {
      snapshot,
    },
  }
}

export const clearCrosshairSnapshots = () => {
  return {type: ActionTypes.CROSSHAIR_CLEAR}
}

/**
 * RESIZER
 */

export const onResize = (event, resizeProps) => {
  const {height, width} = resizeProps.size

  return {
    type: ActionTypes.RESIZE_ARTBOARD,
    payload: {
      artboardHeight: height,
      artboardWidth: width,
    },
  }
}

/**
 * MOVE
 */
export const moveStart = () => {
  return {type: ActionTypes.MOVE_START}
}

export const moveEnd = () => {
  return {type: ActionTypes.MOVE_END}
}

export const moveDragStart = () => {
  return {type: ActionTypes.MOVE_DRAG_START}
}

export const moveDrag = positions => {
  return {type: ActionTypes.MOVE_DRAG, payload: positions}
}

export const moveDragEnd = () => {
  return {type: ActionTypes.MOVE_DRAG_END}
}

/**
 * ZOOM
 */
export const zoomIn = () => {
  return {type: ActionTypes.ZOOM_IN}
}

export const zoomOut = () => {
  return {type: ActionTypes.ZOOM_OUT}
}

export const zoomInStart = () => {
  return {type: ActionTypes.ZOOM_IN_START}
}

export const zoomOutStart = () => {
  return {type: ActionTypes.ZOOM_OUT_START}
}

export const zoomReset = () => {
  return {type: ActionTypes.ZOOM_RESET}
}

/**
 * UTILS
 */
export const mergePropsWithState = (props, state): Object => {
  const nextState = {}
  Object.keys(props).forEach(key => {
    if (state.hasOwnProperty(key)) {
      const value = props[key]
      if (value !== undefined) {
        nextState[key] = props[key]
      }
    }
  })

  return nextState
}
