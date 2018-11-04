type CSSPropValue = number | string
type CSSNumberValue = string

export const CLASSNAME_PREFIX = 'HSDSArtboard'

export const Keys = {
  B: 66,
  C: 67,
  D: 68,
  G: 71,
  S: 83,
  X: 88,
  Z: 90,
  SPACE: 32,
  ESC: 27,
  BACKSPACE: 8,
}

export function noop() {
  return undefined
}

export function toCSSNumberValue(value: CSSPropValue): CSSNumberValue {
  if (typeof value === 'number') {
    return `${value.toString()}px`
  }

  return value
}

export function getPreparedProps(props: Object): Object {
  return {
    ...props,
    boxSizing: 'border-box',
    pointerEvents: 'none',
  }
}

export function cx(className?: string): string {
  if (!className) return CLASSNAME_PREFIX

  return `${CLASSNAME_PREFIX}-${className}`
}

export function dotcx(className?: string): string {
  const baseClassName = cx(className)
  return `.${baseClassName}`
}

export function isInputNode(node: HTMLElement): boolean {
  return (
    ['input', 'textarea'].includes(node.tagName.toLowerCase()) ||
    node.getAttribute('contenteditable') === 'true'
  )
}
