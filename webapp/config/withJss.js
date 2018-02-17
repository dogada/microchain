/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'
import wrapDisplayName from 'recompose/wrapDisplayName'
import {getContext, createTheme} from './jssContext'
import {getTheme} from '~/store/theme'

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale' // Antialiasing.
    },
    body: {
      margin: 0
    }
  }
})

let AppWrapper = props => props.children

AppWrapper = withStyles(styles)(AppWrapper)

function withRoot (BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps (ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx)
      }

      return {}
    }

    componentWillMount () {
      this.styleContext = getContext()
    }

    componentDidMount () {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.theme !== this.props.theme) {
        this.styleContext.theme = createTheme(nextProps.theme)
        if (document.body) {
          document.body.dir = this.styleContext.theme.direction
        }
      }
    }

    render () {
      return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppWrapper>
            <BaseComponent {...this.props} />
          </AppWrapper>
        </MuiThemeProvider>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot')
  }

  return WithRoot
}

function mapStateToProps (state) {
  return {theme: getTheme(state)}
}

function withJss (comp, styles) {
  let jssComp = withRoot(withStyles(styles)(comp))
  return connect(mapStateToProps)(jssComp)
}

export default withJss
