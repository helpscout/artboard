import * as React from 'react'
import {storiesOf} from '@storybook/react'
import styled from '@helpscout/fancy'
import Artboard from '../src/Artboard'
import Layers from '../src/Layers'

const stories = storiesOf('Layers', module)

stories.add('Example', () => {
  return (
    <Artboard layers={<Layers />} width={500} height={400} id="layers-example">
      <DemoUI>
        <HeaderUI>Hallo</HeaderUI>
        <BodyUI>Body</BodyUI>
        <FooterUI>Footer</FooterUI>
      </DemoUI>
    </Artboard>
  )
})

const DemoUI = styled('div')`
  border-radius: 4px;
  border: 1px solid #e6e8eb;
  box-sizing: border-box;
  background: white;
  width: 260px;
  height: 220px;
  margin-top: -2px;

  * {
    box-sizing: border-box;
  }
`

const BlockUI = styled('div')`
  padding: 16px;
`

const HeaderUI = styled(BlockUI)`
  background: #f5f7f9;
  border-bottom: 1px solid #e6e8eb;
  min-height: 65px;
  padding: 15px 16px;
`

const BodyUI = styled(BlockUI)`
  padding: 18px 16px;
  min-height: 118px;
`

const FooterUI = styled(BlockUI)`
  border-top: 1px solid #e6e8eb;
  padding: 9px 16px;
`
