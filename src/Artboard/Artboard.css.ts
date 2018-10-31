import styled from '@helpscout/fancy'
import {cx} from '../utils'

export const config = {
  backgroundColor: '#f2f2f2',
}

export const ArtboardWrapperUI = styled('div')`
  align-items: center;
  background-color: ${config.backgroundColor};
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  user-select: none;

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

export const ArtboardUI = styled('div')`
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: transform 200ms ease;

  ${({isPerformingAction}) =>
    isPerformingAction &&
    `
    pointer-events: none;
    user-select: none;
  `};

  ${({posX, posY, zoomLevel}) => `
    transform: scale(${zoomLevel}) translate(${posX}px, ${posY}px);
  `};

  ${({isMoving}) =>
    isMoving &&
    `
    transition: none;
  `};
`

export const ContentUI = styled('div')`
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

export const GenericToolBarUI = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 3;
`

export const ZoomWrapperUI = styled(GenericToolBarUI)`
  bottom: 40px;
`

export const KeyboardHintsWrapperUI = styled(GenericToolBarUI)`
  bottom: 10px;
`

export const ToolbarWrapperUI = styled(GenericToolBarUI)`
  top: 20px;
`
