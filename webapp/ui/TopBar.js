// @flow
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { withStyles } from 'material-ui/styles'
import {DRAWER_WIDTH} from '~/shared/constants'
import TopBarMenu from './TopBarMenu'

const PERMANENT_DRAWER_BREAKPOINT = 'md'

const styles = theme => ({
  appBar: {
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up(PERMANENT_DRAWER_BREAKPOINT)]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up(PERMANENT_DRAWER_BREAKPOINT)]: {
      display: 'none'
    }
  },
  flex: {
    flex: 1
  }
})

export type TopBarProps = {
  title?: string,
  toggleDrawer: (event: Object) => void,
  classes: Object
}

function TopBar (props: TopBarProps) {
  const {
    classes,
    toggleDrawer,
    title = ''
  } = props

  function scrollToTop (e) {
    if (['AppBar', 'AppBarTitle'].indexOf(e.target.id) > -1) {
      window.scrollTo(0, 0)
    }
  }

  return (
    <AppBar className={classes.appBar} position='fixed' onClick={scrollToTop}>
      <Toolbar id='AppBar'>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          id='AppBarTitle'
          variant='title' component='h1' color='inherit'
          noWrap className={classes.flex}
        >
          {title || ''}
        </Typography>
        <TopBarMenu />
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles, {withTheme: true})(TopBar)
