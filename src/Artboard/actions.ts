import ActionTypes from './Artboard.ActionTypes'

/**
 * GENERAL
 */
export const onReady = props => {
  return {type: ActionTypes.ON_READY, payload: {props}}
}
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
 * ZOOM
 */
export const zoomIn = () => {
  return {type: ActionTypes.ZOOM_IN}
}

export const zoomOut = () => {
  return {type: ActionTypes.ZOOM_OUT}
}
