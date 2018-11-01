import styled from '@helpscout/fancy'

export const Svg = styled('span')`
  display: block;

  svg {
    display: block;
    height: 100%;
    max-width: 100%;
    width: 100%;
  }

  path,
  rect,
  circle {
    fill: currentcolor;
  }

  ${({color}) => `
    color: ${color};
  `};

  ${({size}) => `
    width: ${size};
  `};
`

Svg.defaultProps = {
  color: 'currentcolor',
  size: '70px',
}

export default Svg
