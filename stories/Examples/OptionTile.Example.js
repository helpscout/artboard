import * as React from 'react'
import OptionTile from '@helpscout/hsds-react/components/OptionTile'
import GuideContainer from '../../src/GuideContainer'
import Guide from '../../src/Guide'

export const OptionTileGuides = () => (
  <GuideContainer position="absolute" top={0} left={0}>
    <Guide width={20} left={0} />
    <Guide width={20} right={0} />
    <Guide top={0} width="100%" height={42} color="blue" />
    <Guide bottom={0} width="100%" height={20} color="blue" />
    <Guide top={77} width="100%" height={1} color="orange" />
    <Guide top={88} width="100%" height={1} color="orange" />
    <Guide
      top={0}
      bottom={0}
      width={10}
      color="blue"
      left="50%"
      marginLeft="-5px"
    />
  </GuideContainer>
)

export default () => (
  <OptionTile.Container>
    <OptionTile
      href="#"
      icon="search"
      title="Keep searching"
      subtitle="Browse our help docs for an answer to your question"
    />
    <OptionTile
      href="#"
      icon="chat"
      title="Talk to us"
      subtitle="Talk with a friendly member of our support team"
    />
  </OptionTile.Container>
)
