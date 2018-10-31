type CSSPropValue = number | string
type CSSNumberValue = string

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

export function cx(className: string): string {
  return `HSDSUIDevKit-${className}`
}
