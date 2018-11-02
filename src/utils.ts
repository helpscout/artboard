type CSSPropValue = number | string
type CSSNumberValue = string

export const Keys = {
  Z: 90,
  X: 88,
  C: 67,
  S: 83,
  B: 66,
  G: 71,
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
  const prefix = 'HSDSUIDevKit'
  if (!className) return prefix

  return `${prefix}-${className}`
}

export function isInputNode(node: HTMLElement): boolean {
  return ['input', 'textarea'].includes(node.tagName.toLowerCase())
}
