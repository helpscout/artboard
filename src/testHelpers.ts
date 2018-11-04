export function getStyle(node: any, prop?: string): any {
  let targetNode = node
  try {
    targetNode = targetNode.getDOMNode()
  } finally {
    const styles = window.getComputedStyle(targetNode)
    if (!styles) return {}
    if (!prop) return styles

    return styles[prop]
  }
}

export function findOne(wrapper: any, selector: string): any {
  let result

  try {
    result = wrapper.find(selector)
    if (result.length !== 1) {
      result = result.last()
    }
  } catch {
    result = wrapper
  } finally {
    return result
  }
}
