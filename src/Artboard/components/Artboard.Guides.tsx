import * as React from 'react'
import {connect} from 'react-redux'
import GuideContainer from '../../GuideContainer'
import Guide from '../../Guide'

export class ArtboardGuides extends React.Component<any> {
  static defaultProps = {
    guides: [],
    withCenterGuides: true,
  }

  render() {
    const {guides, withCenterGuides} = this.props
    let guidesMarkup = guides

    if (Array.isArray(guides)) {
      guidesMarkup = guides.map((item, index) => {
        const key = `guide-${index}`
        let props = item.props ? item.props : item

        if (typeof item === 'object') {
          return <Guide {...props} key={key} />
        }

        return null
      })
    }

    return (
      <GuideContainer
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={999999}
      >
        {guidesMarkup}
        {withCenterGuides && [
          <Guide
            top="50%"
            width="100%"
            height={1}
            showValues={false}
            key="cross1"
          />,
          <Guide
            left="50%"
            height="100%"
            width={1}
            showValues={false}
            key="cross2"
          />,
        ]}
      </GuideContainer>
    )
  }
}

const mapStateToProps = state => {
  const {guides, withCenterGuides} = state

  return {
    guides,
    withCenterGuides,
  }
}

export default connect(mapStateToProps)(ArtboardGuides)
