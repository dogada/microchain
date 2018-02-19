// @flow
import * as React from 'react'
import config from '~/config'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
import Link from 'next/link'
import List, {ListItem, ListItemText} from 'material-ui/List'
import {Headline, Subheading} from '~/ui/typography'
import {getBlockchain, syncBlocks} from '~/store/blocks'

import type {Block} from '~/types'

const debug = config.debug('Homepage')

type ProvidedProps = {
  error?: Object,
  title?: string,
  url: Object,
  dispatch: Function
}

type Props = {
  blocks: Array<Block>,
  syncTime?: string
}

class Homepage extends React.PureComponent<ProvidedProps&Props> {
  componentDidMount () {
    debug('compDidMount')
    this.props.dispatch(syncBlocks())
  }

  render () {
    let {blocks, syncTime} = this.props
    return (
      <BaseLayout title='Blockchain Explorer'>
        <Headline>Latest blocks</Headline>
        <Subheading>Last sync time: {syncTime}</Subheading>
        <List>
          {blocks.map(b => (
            <ListItem key={b.id}>
              <Link href={'/blocks/' + b.id}>
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

export default initPage(Homepage, {}, mapStateToProps)
