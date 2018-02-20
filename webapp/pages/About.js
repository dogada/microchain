// @flow
import * as React from 'react'
import {initPage} from '~/config/page'
import { Headline, Body1 } from '~/ui/typography'
import Layout from '~/ui/BaseLayout'
import build from '~/shared/build.json'

const styles = {
}

type Props = {
  classes: Object
}

class About extends React.PureComponent<Props> {
  render () {
    return (
      <Layout title='About us'>
        <Headline>Microchain</Headline>
        <Body1>Website version: {build.version}</Body1>
        <Body1><a href='https://github.com/dogada/microchain'>Source code</a></Body1>
      </Layout>
    )
  }
}

export default initPage(About, styles)
