import { withStyles } from 'material-ui/styles'
import { Body1 } from './typography'

const styles = theme => ({
  root: {
    overflow: 'auto',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing.unit * 3
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit
    }
  }
})

function AppFooter ({classes}) {
  return (
    <footer className={classes.root}>
      <Body1>&copy; Dmytro V. Dogadailo, 2018</Body1>
    </footer>
  )
}

export default withStyles(styles)(AppFooter)
