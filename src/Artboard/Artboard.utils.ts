import {State, Action} from './Artboard.types'
const LOCAL_STORAGE_KEY = '__HSDS_ARTBOARD__'

export const defaultProps = {
  __debug: false,
  alignHorizontally: 'center',
  alignVertically: 'center',
  darkMode: false,
  defaultHeight: 280,
  defaultWidth: 400,
  padding: 0,
  posX: 0,
  posY: 0,
  showGuides: false,
  showBoxInspector: false,
  showInterface: false,
  snapshots: [],
  withCenterGuides: false,
  withResponsiveHeight: false,
  withResponsiveWidth: false,
  zoomLevel: 1,
}

export function getNextArtboardSize(state: State, action: Action) {
  const {artboardWidth: nextWidth, artboardHeight: nextHeight} = action.payload
  const {artboardWidth, artboardHeight, zoomLevel} = state

  const computedNextWidth = (nextWidth - artboardWidth) / zoomLevel
  const computedNextHeight = (nextHeight - artboardHeight) / zoomLevel

  const updatedWidth = artboardWidth + computedNextWidth
  const updatedHeight = artboardHeight + computedNextHeight

  return {
    artboardWidth: updatedWidth,
    artboardHeight: updatedHeight,
  }
}

export function getArtboardNameFromProps(props: any) {
  if (!props) return ''
  return props.id || props.name || ''
}

export function loadState(): Object {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (serializedState === null) {
      // Save the initial state, if not defined
      saveState({})
      return {}
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return {}
  }
}

export function saveState(state: Object = {}): undefined {
  if (!state) return undefined

  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState)

    return undefined
  } catch (err) {
    return undefined
  }
}

export function loadSessionState(id: string): Object {
  if (!id) return {}

  try {
    const localState = loadState()
    if (!localState || !localState[id]) {
      // Save the initial state, if not defined
      saveSessionState(id, {})
      return {}
    }

    return localState[id]
  } catch (err) {
    return {}
  }
}

export function saveSessionState(id: string, state: Object): undefined {
  if (!id) return undefined

  try {
    const localState = loadState()
    if (!localState) return undefined

    const nextState = {
      ...localState,
      [id]: state,
    }

    saveState(nextState)

    return undefined
  } catch (err) {
    return undefined
  }
}
