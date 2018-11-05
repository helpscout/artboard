import styled from '@helpscout/fancy'
import Base from '../UI/Base'
import {cx} from '../utils'

export const config = {
  backgroundColor: '#f2f2f2',
  backgroundColorDark: '#1d1a1d',
  color: '#000',
  colorDark: '#fff',
}

export const ArtboardWrapperUI = styled(Base)`
  align-items: center;
  background-color: ${config.backgroundColor};
  box-sizing: border-box;
  bottom: 0;
  color: ${config.color};
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  transition: color 200ms linear, background-color 200ms linear;
  top: 0;
  user-select: none;

  ${({theme}) =>
    theme.darkMode &&
    `
    background-color: ${config.backgroundColorDark};
    color: ${config.colorDark};
  `};

  ${({isZooming}) => {
    if (isZooming === 'in') {
      return 'cursor: zoom-in;'
    }
    if (isZooming === 'out') {
      return 'cursor: zoom-out;'
    }
    return ''
  }};

  ${({isMoving}) => {
    if (isMoving === 'start') {
      return 'cursor: grab;'
    }
    if (isMoving === 'dragging') {
      return 'cursor: grabbing;'
    }
    return ''
  }};
`

export const ArtboardUI = styled(Base)`
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: background 200ms linear, transform 200ms ease;
  will-change: transform;

  ${({theme}) =>
    theme.darkMode &&
    `
    background-color: black;
  `};

  ${({isPerformingAction}) =>
    isPerformingAction &&
    `
    pointer-events: none;
    user-select: none;

    * {
      pointer-events: none !important;
      user-select: none !important;
    }
  `};

  ${({isMoving}) =>
    isMoving &&
    `
    transition: none;
  `};
`

export const ContentUI = styled(Base)`
  display: flex;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;

  .${cx('Resizer')} {
    display: flex;
    min-width: 0;
    min-height: 0;
    width: 100%;
    height: 100%;

    ${({alignHorizontally}) => {
      let justifyContent = 'center'
      if (alignHorizontally === 'left') {
        justifyContent = 'flex-start'
      }
      if (alignHorizontally === 'right') {
        justifyContent = 'flex-end'
      }

      return `justify-content: ${justifyContent};`
    }} ${({alignVertically}) => {
      let alignItems = 'center'
      if (alignVertically === 'left') {
        alignItems = 'flex-start'
      }
      if (alignVertically === 'right') {
        alignItems = 'flex-end'
      }

      return `align-items: ${alignItems};`
    }};
  }
`

export const ArtboardContentUI = styled(Base)(props => ({
  padding: props.padding,
}))

export const ArtboardBodyUI = styled(Base)`
  position: relative;
`

export const GenericToolBarUI = styled(Base)`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  pointer-events: none;
  transform: translateZ(0);
  width: 100%;
  z-index: 2147483647;
`

export const ZoomWrapperUI = styled(GenericToolBarUI)`
  bottom: 40px;
`

export const KeyboardHintsWrapperUI = styled(GenericToolBarUI)`
  z-index: 2147483637;
  bottom: 10px;
`

export const ToolbarWrapperUI = styled(GenericToolBarUI)`
  top: 20px;
`

export const ToolbarCornerUI = styled(Base)`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  position: absolute;
`

export const ToolbarLeftUI = styled(ToolbarCornerUI)`
  left: 10px;
`

export const ToolbarRightUI = styled(ToolbarCornerUI)`
  right: 10px;
`
