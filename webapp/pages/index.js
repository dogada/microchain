// @flow
import * as React from 'react'
import config from '~/config'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
// import Link from 'next/link'
import {Subheading} from '~/ui/typography'

const debug = config.debug('Homepage')

type ProvidedProps = {
  error?: Object,
  title?: string,
  url: Object,
  dispatch: Function
}

type State = {
}

class Homepage extends React.PureComponent<ProvidedProps, State> {
  componentDidMount () {
    debug('compDidMount')
  }

  render () {
    return (
      <BaseLayout title='MicroChain'>
        <Subheading>MicroChain demo</Subheading>
      </BaseLayout>
    )
  }
}

export default initPage(Homepage)
