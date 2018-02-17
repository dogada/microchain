// @flow
import config from '~/config'
import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import Head from 'next/head'
import Grid from 'material-ui/Grid'
import {pageTitle} from '~/config/page'
import AppFooter from './AppFooter'
import TopBar from './TopBar'
import AppDrawer from './AppDrawer'
import ErrorBoundary from '~/ui/ErrorBoundary'

const debug = config.debug('BaseLayout')

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1
  },
  primary: {
    // width: '100%',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing.unit * 3
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit
    },
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  },
  secondary: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing.unit * 3
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: 64
    }
  },

  bordered: {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'red'
  }
})

type ProvidedProps = {
  classes: Object,
  dispatch: Function
}

type Props = {
  title: string,
  drawer: any,
  aside?: any,
  children: any
}

class AppLayout extends React.Component<ProvidedProps & Props, Object> {
  state = {
    mobileOpen: false
  };

  toggleDrawer = () => {
    debug('toggleDrawer')
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render () {
    const {
      classes,
      drawer,
      aside,
      title,
      children
    } = this.props
    let links = Array.isArray(drawer) ? drawer : null

    return (
      <ErrorBoundary>
        <Head>
          <title>{pageTitle(title)}</title>
        </Head>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <ErrorBoundary>
              <TopBar title={title} toggleDrawer={this.toggleDrawer} />
            </ErrorBoundary>
            <AppDrawer
              links={links}
              mobileOpen={this.state.mobileOpen}
              onClose={this.toggleDrawer}
            />
            <Grid container className={classes.content + ' ' + classes.bordered}>
              <Grid item xs={12} lg={9} className={classes.bordered}>
                <main className={classes.primary}>
                  <ErrorBoundary>{children}</ErrorBoundary>
                </main>
              </Grid>
              <Grid item xs={12} lg={3}>
                <aside className={classes.secondary + ' ' + classes.bordered}>
                  <ErrorBoundary>{aside}</ErrorBoundary>
                </aside>
              </Grid>
              <Grid item xs={12}>
                <AppFooter />
              </Grid>
            </Grid>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}

export default withStyles(styles)(AppLayout)
