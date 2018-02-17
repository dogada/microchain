// @flow
import * as React from 'react'
import {Subheading, Typography} from './typography'
import {DEV_MODE} from '~/shared/constants'

type Info = {
  componentStack: string
}

type Props = {
}

type State = {
  error?: Error,
  info?: Info
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
  }

  componentDidCatch (error: Error, info: Info) {
    // Display fallback UI
    this.setState({error, info})
    console.error('ErrorBoundary', error, info && info.componentStack)
  }

  render (): any {
    let {error, info} = this.state
    if (error && info) {
      // You can render any custom fallback UI
      if (DEV_MODE) {
        return (
          <div>
            <Subheading>Error: {error.message}</Subheading>
            <Typography component='code'>
              <pre>{'' + info.componentStack}</pre>
            </Typography>
          </div>
        )
      } else {
        return (
          <div>
            <Subheading>Something went wrong</Subheading>
            <Typography>{error.message}</Typography>
          </div>
        )
      }
    }
    return this.props.children || null
  }
}
