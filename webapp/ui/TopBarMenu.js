// @flow
import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import { withStyles } from 'material-ui/styles'
import {getTheme, updateTheme} from '~/store/theme'

import type { Node } from 'react'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  },
  itemWithSelect: {
    height: 32
  }
})

type ProvidedProps = {
  page: Object,
  classes: Object,
  theme?: Object,
  dispatch: (Object | Function) => void
}

type Props = {
  children?: Node,
}

type State = {
  anchorEl?: any
}

class TopMenu extends React.Component<ProvidedProps & Props, State> {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  closeMenu = () => this.setState({ anchorEl: null })

  onDarkThemeSwitch = (event, dark) => {
    this.props.dispatch(updateTheme({dark}))
    this.closeMenu()
  };

  render () {
    const {theme} = this.props
    const open = Boolean(this.state.anchorEl)
    return (
      <div>
        <IconButton
          aria-label='More'
          aria-owns={open ? 'top-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}
          color='inherit'
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='top-menu'
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  checked={theme.dark}
                  onChange={this.onDarkThemeSwitch}
                />
              }
              label='Dark theme' />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let theme = getTheme(state)
  return {theme}
}

export default connect(mapStateToProps)(withStyles(styles)(TopMenu))
