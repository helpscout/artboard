import React from 'react'
import {storiesOf} from '@storybook/react'
import GuideProvider from '../src/GuideProvider'
import GuideContainer from '../src/GuideContainer'
import Guide from '../src/Guide'

const stories = storiesOf('Basic', module)

stories.add('Example', () => {
  const guideProps = {
    position: 'relative',
    margin: '0 10px',
    width: '80px',
  }

  return (
    <GuideProvider {...guideProps}>
      <GuideContainer display="flex" height="80vh">
        <Guide />
        <Guide />
        <Guide />
        <Guide />
        <Guide />
        <Guide />
        <Guide />
        <Guide />
      </GuideContainer>
    </GuideProvider>
  )
})
