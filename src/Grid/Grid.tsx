import * as React from 'react'
import styled from '@helpscout/fancy'
import GuideContainer from '../GuideContainer'
import GuideProvider from '../GuideProvider'
import Guide from '../Guide'
import {cx} from '../utils'

class Grid extends React.PureComponent<any> {
  static defaultProps = {
    maxWidth: 1020,
    margin: 'auto',
    gutter: 15,
    grid: 12,
  }

  getGuideProps = (): Object => {
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

  getContainerProps = (): Object => {
    const {grid, gutter, ...rest} = this.props

    return {
      ...rest,
      margin: 'auto',
    }
  }

  getRowProps = (): Object => {
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

  renderGuides = (): Array<any> => {
    const {grid} = this.props

    return [...Array.from(Array(grid).keys())].map((item, index) => (
      <Guide key={`guide-${index}`} className={cx('GridGuide')} />
    ))
  }

  render() {
    return (
      <GuideProvider {...this.getGuideProps()}>
        <GuideContainer {...this.getContainerProps()} className={cx('Grid')}>
          <RowUI {...this.getRowProps()} className={cx('GridRow')}>
            {this.renderGuides()}
          </RowUI>
        </GuideContainer>
      </GuideProvider>
    )
  }
}

const RowUI = styled('div')(({children, ...props}) => props)

export default Grid
