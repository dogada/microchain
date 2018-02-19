// @flow
import * as React from 'react'
import config from '~/config'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
import Link from '~/ui/Link'
import List, {ListItem, ListItemText} from 'material-ui/List'
import {Headline, Subheading} from '~/ui/typography'
import {getBlockchain, syncBlocks} from '~/store/blocks'

import type {Block} from '~/types'

const debug = config.debug('Explorer')

type ProvidedProps = {
  url: Object,
  dispatch: Function
}

type Props = {
  blocks: Array<Block>,
  syncTime?: string
}

class Explorer extends React.PureComponent<ProvidedProps&Props> {
  componentDidMount () {
    debug('compDidMount')
    this.props.dispatch(syncBlocks())
  }

  render () {
    let {blocks, syncTime} = this.props
    debug('blocks', blocks)
    return (
      <BaseLayout title='Blockchain Explorer'>
        <Headline>Latest blocks</Headline>
        <Subheading>Last sync time: {syncTime}</Subheading>
        <List>
          {blocks.map(b => (
            <ListItem key={b.index}>
              <Link route='block' params={{index: b.index}}>
                <ListItemText primary={b.timestamp} secondary={b.hash} />
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

export default initPage(Explorer, {}, mapStateToProps)
