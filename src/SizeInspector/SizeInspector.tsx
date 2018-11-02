import * as React from 'react'

export interface Props {
  color: string
  offsetColor: string
  showOutlines: boolean
  targetSelector: string
  zoomLevel: number
}

const SIZE_NODE_CLASSNAME = 'SizeInspector__SizeNode'
const SIZE_NODE_SELECTOR = `.${SIZE_NODE_CLASSNAME}`

export class SizeInspector extends React.PureComponent<Props> {
  static defaultProps = {
    color: 'fuchsia',
    offsetColor: 'orange',
    targetSelector: '*',
    showOutlines: true,
    zoomLevel: 1,
  }

  node: HTMLDivElement
  currentNode?: HTMLElement
  sizeNode?: HTMLElement

  componentDidMount() {
    this.bindEvents()
  }

  componentWillUnmount() {
    this.unbindEvents()
    this.cleanUp()
  }

  componentDidUpdate() {
    this.unbindEvents()
    this.bindEvents()
    if (!this.props.showOutlines) {
      this.cleanUp()
    }
  }

  bindEvents = () => {
    if (!this.props.showOutlines) return

    Array.from(this.node.querySelectorAll(this.props.targetSelector)).forEach(
      node => {
        node.addEventListener('mouseenter', this.handleOnMouseEnter)
        node.addEventListener('mouseleave', this.handleOnMouseLeave)
      },
    )
  }

  unbindEvents = () => {
    Array.from(this.node.querySelectorAll(this.props.targetSelector)).forEach(
      node => {
        node.removeEventListener('mouseenter', this.handleOnMouseEnter)
        node.removeEventListener('mouseleave', this.handleOnMouseLeave)
      },
    )
  }

  cleanUp = () => {
    Array.from(document.querySelectorAll(SIZE_NODE_SELECTOR)).forEach(
      node => node && node.parentNode && node.parentNode.removeChild(node),
    )
  }

  handleOnMouseEnter = event => {
    this.showSizeNode(event)
  }

  handleOnMouseLeave = event => {
    const node = event.target
    this.removeSizeNode()
    this.currentNode = undefined
    if (node.parentNode) {
      if (node.parentNode === this.node) {
        this.removeSizeNode()
      } else {
        this.showSizeNode({target: node.parentNode})
      }
    }
  }

  showSizeNode = event => {
    if (!this.props.showOutlines) return
    const node = event.target
    this.addSizeNode(event)
    this.currentNode = node
  }

  addSizeNode = event => {
    this.removeSizeNode()
    const sizeNode = this.createSizeNode(event.target)
    document.body.appendChild(sizeNode)
    this.sizeNode = sizeNode
  }

  removeSizeNode = () => {
    if (this.sizeNode && this.sizeNode.parentNode) {
      this.sizeNode.parentNode.removeChild(this.sizeNode)
    }
  }

  createSizeNode = (targetNode: HTMLElement): HTMLElement => {
    const {color, offsetColor, zoomLevel} = this.props
    const sizeNode = document.createElement('div')
    const parentNode = targetNode.offsetParent
    const rect = targetNode.getBoundingClientRect()
    // @ts-ignore
    const parentRect = parentNode.getBoundingClientRect()
    sizeNode.classList.add(SIZE_NODE_CLASSNAME)

    setNodeStyles(sizeNode, {
      background: 'rgba(255, 255, 255, 0.7)',
      color,
      outline: '1px solid currentColor',
      fontFamily:
        '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
      fontSize: '10px',
      lineHeight: '1',
      height: `${rect.height}px`,
      width: `${rect.width}px`,
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      zIndex: '999',
      pointerEvents: 'none',
    })

    const zoomOffsetTop = Math.round(targetNode.offsetTop * zoomLevel)
    const zoomOffsetLeft = Math.round(targetNode.offsetLeft * zoomLevel)

    let offsetRight =
      // @ts-ignore
      parentRect.width - (zoomOffsetLeft + rect.width)
    offsetRight = offsetRight >= 0 ? offsetRight : 0

    let offsetBottom =
      // @ts-ignore
      parentRect.height - (zoomOffsetTop + rect.height)
    offsetBottom = offsetBottom >= 0 ? offsetBottom : 0

    // @ts-ignore
    const values = {
      width: Math.round(rect.width / zoomLevel),
      height: Math.round(rect.height / zoomLevel),
      offsetTop: Math.round(zoomOffsetTop / zoomLevel),
      offsetLeft: Math.round(zoomOffsetLeft / zoomLevel),
      offsetRight: Math.round(offsetRight / zoomLevel),
      offsetBottom: Math.round(offsetBottom / zoomLevel),
    }

    const widthNode = document.createElement('div')
    const heightNode = document.createElement('div')
    const heightTextNode = document.createElement('div')
    const topDistanceNode = document.createElement('div')
    const leftDistanceNode = document.createElement('div')
    const rightDistanceNode = document.createElement('div')
    const bottomDistanceNode = document.createElement('div')
    const distanceTopTextNode = document.createElement('div')
    const distanceLeftTextNode = document.createElement('div')
    const distanceRightTextNode = document.createElement('div')
    const distanceBottomTextNode = document.createElement('div')

    const alignCenterStyles = {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }

    setNodeStyles(widthNode, {
      boxSizing: 'border-box',
      color: 'currentColor',
      position: 'absolute',
      left: '50%',
      lineHeight: 'inherit',
      top: '1px',
      width: '20px',
      textAlign: 'center',
      marginLeft: '-10px',
    })

    setNodeStyles(heightNode, {
      ...alignCenterStyles,
      color: 'currentColor',
      position: 'absolute',
      top: '0',
      lineHeight: 'inherit',
      height: '100%',
      left: '0px',
      display: 'flex',
    })

    setNodeStyles(heightTextNode, {
      boxSizing: 'border-box',
      transform: 'rotate(-90deg)',
    })

    setNodeStyles(topDistanceNode, {
      ...alignCenterStyles,
      color: offsetColor,
      backgroundColor: 'currentColor',
      width: '1px',
      height: `${values.offsetTop * zoomLevel}px`,
      position: 'absolute',
      left: '50%',
      top: `-${values.offsetTop * zoomLevel}px`,
    })

    setNodeStyles(leftDistanceNode, {
      boxSizing: 'border-box',
      color: offsetColor,
      backgroundColor: 'currentColor',
      height: '1px',
      width: `${values.offsetLeft * zoomLevel}px`,
      position: 'absolute',
      top: '50%',
      left: `-${values.offsetLeft * zoomLevel}px`,
    })

    setNodeStyles(rightDistanceNode, {
      boxSizing: 'border-box',
      color: offsetColor,
      backgroundColor: 'currentColor',
      height: '1px',
      width: `${values.offsetRight * zoomLevel}px`,
      position: 'absolute',
      top: '50%',
      right: `-${values.offsetRight * zoomLevel}px`,
    })

    setNodeStyles(bottomDistanceNode, {
      ...alignCenterStyles,
      color: offsetColor,
      backgroundColor: 'currentColor',
      width: '1px',
      height: `${values.offsetBottom * zoomLevel}px`,
      position: 'absolute',
      left: '50%',
      bottom: `-${values.offsetBottom * zoomLevel}px`,
    })

    setNodeStyles(distanceTopTextNode, {
      boxSizing: 'border-box',
      transform: 'translateX(-100%)',
      marginRight: '-2px',
    })

    setNodeStyles(distanceLeftTextNode, {
      boxSizing: 'border-box',
      transform: 'translateY(-100%)',
      width: '100%',
      paddingRight: '3px',
      textAlign: 'right',
    })

    setNodeStyles(distanceRightTextNode, {
      boxSizing: 'border-box',
      transform: 'translateY(-100%)',
      width: '100%',
      paddingLeft: '3px',
      textAlign: 'left',
    })

    setNodeStyles(distanceBottomTextNode, {
      boxSizing: 'border-box',
      transform: 'translateX(-100%)',
      marginRight: '-2px',
    })

    widthNode.innerHTML = `${values.width}`
    heightTextNode.innerHTML = `${values.height}`
    distanceTopTextNode.innerHTML = `${values.offsetTop}`
    distanceLeftTextNode.innerHTML = `${values.offsetLeft}`
    distanceRightTextNode.innerHTML = `${values.offsetRight}`
    distanceBottomTextNode.innerHTML = `${values.offsetBottom}`

    heightNode.appendChild(heightTextNode)
    topDistanceNode.appendChild(distanceTopTextNode)
    leftDistanceNode.appendChild(distanceLeftTextNode)
    rightDistanceNode.appendChild(distanceRightTextNode)
    bottomDistanceNode.appendChild(distanceBottomTextNode)

    if (values.offsetTop > 0) {
      sizeNode.appendChild(topDistanceNode)
    }
    if (values.offsetLeft > 0) {
      sizeNode.appendChild(leftDistanceNode)
    }
    if (values.offsetRight > 0) {
      sizeNode.appendChild(rightDistanceNode)
    }
    if (values.offsetBottom > 0) {
      sizeNode.appendChild(bottomDistanceNode)
    }
    sizeNode.appendChild(heightNode)
    sizeNode.appendChild(widthNode)

    return sizeNode
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {children} = this.props

    return <div ref={this.setNodeRef} children={children} />
  }
}

export function setNodeStyles(node: HTMLElement, styles: Object): HTMLElement {
  Object.keys(styles).forEach(k => {
    node.style[k] = styles[k]
  })

  return node
}

export default SizeInspector
