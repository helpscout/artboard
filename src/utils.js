export function toCSSNumberValue(value) {
  if (typeof value === 'number') {
    return `${value.toString()}px`
  }

  return value
}

export function getPreparedProps(props) {
  return {
    ...props,
    boxSizing: 'border-box',
    pointerEvents: 'none',
  }
}
