// @flow
import * as React from 'react'
import config from '~/config'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
import Error from './_error'
import Link from '~/ui/Link'
import List, {ListItem, ListItemText} from 'material-ui/List'
import {Headline, Subheading} from '~/ui/typography'
import {getBlockchain, syncBlocks} from '~/store/blocks'

import type {Block} from '~/types'

const debug = config.debug('BlockPage')

type ProvidedProps = {
  url: Object,
  dispatch: Function
}

type Props = {
  block: Block
}

class BlockPage extends React.PureComponent<ProvidedProps&Props> {
  static getInitialProps ({store, req}) {
    if (!req) {
      // wait for blockchain if we didn't load it yet
      return store.dispatch(syncBlocks())
    }
  }

  componentDidMount () {
    this.props.dispatch(syncBlocks())
  }

  render () {
    let {block} = this.props
    if (!block) return (<Error statusCode={404} message="Block isn't found" />)
    return (
      <BaseLayout title='Blockchain Explorer'>
        <Headline>Block {block.index} ({block.timestamp})</Headline>
        <Subheading>{block.hash}</Subheading>
      </BaseLayout>
    )
  }
}

export function findBlock (blocks, index) {
  return blocks.filter(b => b.index === index)[0]
}

function mapStateToProps (state: Object, props: Object): Object {
  debug('mapState', props.url.query.index)
  let {blocks} = getBlockchain(state)
  let index = parseInt(props.url.query.index)
  debug('blocks', blocks)
  let block = findBlock(blocks, index)
  debug(index, block)
  return {
    block
  }
}

export default initPage(BlockPage, {}, mapStateToProps)
