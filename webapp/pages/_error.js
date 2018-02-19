// @flow
import React from 'react'
import Layout from '~/ui/BaseLayout'
import Link from '~/ui/Link'
import Button from 'material-ui/Button'
import Toolbar from 'material-ui/Toolbar'
import {Display1, Headline, Body1} from '~/ui/typography'
import {initPage} from '~/config/page'

type Props = {
  statusCode?: number,
  message?: string
}

class Error extends React.Component<Props> {
  // called for system errors
  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { error: {statusCode, message: 'Unknown error'} }
  }

  render () {
    const {
      statusCode,
      message = 'Oops, something went wrong'
    } = this.props
    console.log('url', this.props.url)
    let currentPath = typeof window !== 'undefined' ? window.location.pathname : null

    return (
      <Layout>
        <Display1>Error {statusCode}</Display1>
        <Headline>{message}</Headline>
        <Body1>We're sorry...</Body1>
        <Body1>Our admins are notified about this error already.</Body1>
        <Body1>Please choose an action bellow.</Body1>
        <Toolbar disableGutters>
          <Link href={currentPath}>
            <Button>Reload current page</Button>
          </Link>
          <Button onClick={() => window.history.back()}>Return to previous page</Button>
          <Link href='/'>
            <Button>Go to homepage</Button>
          </Link>
        </Toolbar>
      </Layout>
    )
  }
}

export default initPage(Error)
