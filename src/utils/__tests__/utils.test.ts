import {
  CLASSNAME_PREFIX,
  noop,
  toCSSNumberValue,
  cx,
  isInputNode,
} from '../index'

describe('noop', () => {
  test('Returns undefined', () => {
    expect(noop()).toBe(undefined)
  })
})

describe('toCSSNumberValue', () => {
  test('Transforms number to px', () => {
    expect(toCSSNumberValue(0)).toBe('0px')
    expect(toCSSNumberValue(59)).toBe('59px')
    expect(toCSSNumberValue(1080)).toBe('1080px')
  })

  test('Allows px values', () => {
    expect(toCSSNumberValue('0px')).toBe('0px')
    expect(toCSSNumberValue('59px')).toBe('59px')
    expect(toCSSNumberValue('1080px')).toBe('1080px')
  })

  test('Allows em values', () => {
    expect(toCSSNumberValue('0em')).toBe('0em')
    expect(toCSSNumberValue('59em')).toBe('59em')
    expect(toCSSNumberValue('1080em')).toBe('1080em')
  })

  test('Allows rem values', () => {
    expect(toCSSNumberValue('0rem')).toBe('0rem')
    expect(toCSSNumberValue('59rem')).toBe('59rem')
    expect(toCSSNumberValue('1080rem')).toBe('1080rem')
  })

  test('Allows % values', () => {
    expect(toCSSNumberValue('0%')).toBe('0%')
    expect(toCSSNumberValue('59%')).toBe('59%')
    expect(toCSSNumberValue('1080%')).toBe('1080%')
  })
})

describe('cx', () => {
  test('Prefixes with Artboard className', () => {
    expect(cx('Hallo')).toContain(CLASSNAME_PREFIX)
    expect(cx('Hallo')).toContain('Hallo')
  })

  test('Returns Artboard prefix, if no argument is provided', () => {
    expect(cx()).toContain(CLASSNAME_PREFIX)
    expect(cx()).not.toContain('Hallo')
  })
})

describe('isInputNode', () => {
  test('Returns true for HTMLInputElement', () => {
    const node = document.createElement('input')

    expect(isInputNode(node)).toBe(true)
  })

  test('Returns true for HTMLTextAreaElement', () => {
    const node = document.createElement('textarea')

    expect(isInputNode(node)).toBe(true)
  })

  test('Returns true for contenteditable', () => {
    const node = document.createElement('div')
    node.setAttribute('contenteditable', 'true')

    expect(isInputNode(node)).toBe(true)
  })

  test('Returns false for non-Input/Textarea', () => {
    expect(isInputNode(document.createElement('select'))).toBe(false)
    expect(isInputNode(document.createElement('div'))).toBe(false)
    expect(isInputNode(document.createElement('section'))).toBe(false)
    expect(isInputNode(document.createElement('p'))).toBe(false)
    expect(isInputNode(document.createElement('a'))).toBe(false)
  })
})
