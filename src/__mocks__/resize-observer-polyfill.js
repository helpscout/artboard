class ResizeObserver {
  constructor(handler) {
    this.handler = handler
    this.observable = null
  }

  observe = observable => {
    this.observable = observable
  }

  unobserve = (observable?: any) => {
    this.observable = null
  }
}

export default ResizeObserver
