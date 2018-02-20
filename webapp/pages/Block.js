// @flow
import * as React from 'react'
import config from '~/config'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
import Error from './_error'
import {Headline, Subheading, Body1} from '~/ui/typography'
import TransactionList from '~/ui/TransactionList'
import {getBlockchain, syncBlocks} from '~/store/blocks'

import type {Block} from '~/types'

const debug = config.debug('BlockPage')

type ProvidedProps = {
  url: Object,
  dispatch: Function
}

type Props = {
  block: Block,
  error?: boolean
}

class BlockPage extends React.PureComponent<ProvidedProps&Props> {
  componentDidMount () {
    this.props.dispatch(syncBlocks())
  }

  renderBlock () {
    let {block} = this.props
    return (
      <React.Fragment>
        <Headline>Block {block.index} ({block.timestamp})</Headline>
        <Subheading>{block.data.transactions.length} transactions</Subheading>
        <Body1>Hash: {block.hash}</Body1>
        <Body1>Proof: {block.data['proof-of-work']}</Body1>
        <TransactionList data={block.data.transactions} />
      </React.Fragment>
    )
  }

  render () {
    let {block, error} = this.props
    if (error) {
      return (<Error statusCode={404} message="Block isn't found" />)
    }
    return (
      <BaseLayout title='Block details'>
        {block ? this.renderBlock() : 'Loading...'}
      </BaseLayout>
    )
  }
}

export function findBlock (blocks: Array<Block>, index: number) {
  return blocks.filter(b => b.index === index)[0]
}

function mapStateToProps (state: Object, props: Object): Object {
  debug('mapState', props.url.query.index)
  let {blocks} = getBlockchain(state)
  let index = parseInt(props.url.query.index, 10)
  debug('blocks', blocks)
  let block = findBlock(blocks, index)
  debug(index, block)
  return {
    block,
    error: blocks.length && !block
  }
}

export default initPage(BlockPage, {}, mapStateToProps)
