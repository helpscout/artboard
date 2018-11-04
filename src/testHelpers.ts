export function getStyle(node: any, prop?: string): any {
  let targetNode = node
  try {
    targetNode = targetNode.getDOMNode()
  } finally {
    const styles = window.getComputedStyle(targetNode)
    if (!prop) return styles

    return styles[prop]
  }
}
