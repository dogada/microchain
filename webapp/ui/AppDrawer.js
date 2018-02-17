// @flow
import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import Link from 'next/link'
import List, {ListItem, ListItemText} from 'material-ui/List'
import ErrorBoundary from '~/ui/ErrorBoundary'

const styles = theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  toolbar: {
    // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
    display: 'flex',
    position: 'fixed',
    width: 250,
    zIndex: 10,
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  brand: {
    marginLeft: theme.spacing.unit * 2,
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
  content: {
    marginTop: 64
  },
  anchor: {
    color: theme.palette.text.secondary
  }
})

function renderDrawerHeader (props) {
  const { classes } = props
  return (
    <div className={classes.toolbar}>
      <Toolbar>
        <Typography variant='title' color='inherit' className={classes.brand} noWrap>
          <Link href='/'>
            <a>MICROCHAIN</a>
          </Link>
        </Typography>
        <Divider absolute />
      </Toolbar>
    </div>
  )
}

type AppDrawerProps = {
  children?: React.Node,
  mobileOpen?: boolean,
  classes: Object,
  className?: string,
  onClose: Function,
}

const renderListLink = ({text, href, prefetch}) => (
  <ListItem button key={text}>
    <Link href={href} prefetch={prefetch}>
      <ListItemText primary={text} />
    </Link>
  </ListItem>
)

function AppDrawer (props: AppDrawerProps, context) {
  const { classes, className, mobileOpen, onClose } = props

  // TODO: classes.nav
  const drawer = (
    <ErrorBoundary>
      {renderDrawerHeader(props)}
      <div className={classes.content}>
        <List>
          {renderListLink({text: 'About', href: '/about/', prefetch: true})}
        </List>
      </div>
    </ErrorBoundary>
  )

  const temporaryDrawer = (
    <Drawer
      classes={{
        paper: classes.paper
      }}
      variant='temporary'
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true
      }}
    >
      {drawer}
    </Drawer>
  )

  const permanentDrawer = (
    <Drawer
      classes={{
        paper: classes.paper
      }}
      variant='permanent'
      open
    >
      {drawer}
    </Drawer>
  )
  return (
    <div className={className}>
      <Hidden mdUp>
        {temporaryDrawer}
      </Hidden>
      <Hidden smDown implementation='css'>
        {permanentDrawer}
      </Hidden>
    </div>
  )
}

export default withStyles(styles)(AppDrawer)
