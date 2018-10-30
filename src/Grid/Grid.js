import React from 'react'
import styled from '@helpscout/fancy'
import GuideContainer from '../GuideContainer'
import GuideProvider from '../GuideProvider'
import Guide from '../Guide'

class Grid extends React.PureComponent {
  static defaultProps = {
    maxWidth: 1020,
    margin: 'auto',
    gutter: 15,
    grid: 12,
  }

  getGuideProps = () => {
    const {gutter} = this.props
    const gutterOffset = gutter / 2

    return {
      flex: 1,
      minWidth: 0,
      maxWidth: '100%',
      position: 'relative',
      marginLeft: gutterOffset,
      marginRight: gutterOffset,
      width: 'auto',
    }
  }

  getContainerProps = () => {
    const {grid, gutter, ...rest} = this.props

    return {
      ...rest,
      margin: 'auto',
    }
  }

  getRowProps = () => {
    const {gutter} = this.props

    const gutterOffset = (gutter / 2) * -1

    return {
      display: 'flex',
      marginLeft: gutterOffset,
      marginRight: gutterOffset,
      height: '100%',
      minWidth: 0,
      width: '100%',
    }
  }

  renderGuides = () => {
    const {grid} = this.props

    return [...Array.from(Array(grid).keys())].map((item, index) => (
      <Guide key={`guide-${index}`} />
    ))
  }

  render() {
    return (
      <GuideProvider {...this.getGuideProps()}>
        <GuideContainer {...this.getContainerProps()}>
          <RowUI {...this.getRowProps()}>{this.renderGuides()}</RowUI>
        </GuideContainer>
      </GuideProvider>
    )
  }
}

const RowUI = styled('div')(({children, ...props}) => props)

export default Grid
