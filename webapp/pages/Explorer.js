// @flow
import * as React from 'react'
import config from '~/config'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
import Link from '~/ui/Link'
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText} from 'material-ui/List'
import {Headline, Subheading} from '~/ui/typography'
import {getBlockchain, syncBlocks, mineBlock} from '~/store/blocks'

import type {Block} from '~/types'

const debug = config.debug('Explorer')

type ProvidedProps = {
  url: Object,
  dispatch: Function,
  classes: Object
}

type Props = {
  blocks: Array<Block>,
  syncTime?: string
}

const styles = theme => ({
  mineButton: {
    float: 'right'
  }
})

class Explorer extends React.PureComponent<ProvidedProps&Props> {
  mineBlock = () => this.props.dispatch(mineBlock())

  componentDidMount () {
    debug('compDidMount')
    this.props.dispatch(syncBlocks())
  }

  render () {
    let {blocks, syncTime, classes} = this.props
    debug('blocks', blocks)
    return (
      <BaseLayout title='Blockchain Explorer'>
        <Button
          className={classes.mineButton} size='large'
          variant='raised' color='secondary'
          onClick={this.mineBlock}>
          Mine
        </Button>
        <Headline>Latest blocks</Headline>
        <Subheading>Last sync time: {syncTime}</Subheading>
        <List>
          {blocks.map(b => (
            <ListItem button key={b.index}>
              <Link route='block' params={{index: b.index}}>
                <ListItemText
                  primary={`Block ${b.index} (${b.timestamp})`}
                  secondary={`${b.data.transactions.length} transactions`} />
              </Link>
            </ListItem>
          ))}
        </List>
      </BaseLayout>
    )
  }
}

function mapStateToProps (state: Object): Object {
  return getBlockchain(state)
}

export default initPage(Explorer, styles, mapStateToProps)
