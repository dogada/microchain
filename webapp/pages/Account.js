// @flow
import * as React from 'react'
import config from '~/config'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
import {Headline, Subheading} from '~/ui/typography'
import {getAccountsFromState, loadAccountTransactions} from '~/store/accounts'
import BlockTransactionList from '~/ui/BlockTransactionList'
import type {Transaction} from '~/types'

const debug = config.debug('AccountPage')

type ProvidedProps = {
  url: Object,
  dispatch: Function,
  classes: Object
}

type Props = {
  address: string,
  transactions: Array<Transaction>,
  syncTime?: string
}

const styles = theme => ({
})

class AccountPage extends React.PureComponent<ProvidedProps&Props> {
  static defaultProps = {
    transactions: []
  }

  componentDidMount () {
    this.props.dispatch(loadAccountTransactions(this.props.address))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.address !== this.props.address) {
      this.props.dispatch(loadAccountTransactions(nextProps.address))
    }
  }

  render () {
    let {address, syncTime, transactions} = this.props
    return (
      <BaseLayout title='Account details'>
        <Headline>{address}</Headline>
        <Subheading>Last sync time: {syncTime}</Subheading>
        <BlockTransactionList data={transactions} />
      </BaseLayout>
    )
  }
}

function mapStateToProps (state: Object, props: Object): Object {
  let address = props.url.query.address
  debug('mapState address', address)
  let account = getAccountsFromState(state)[address] || {}
  return {
    address,
    ...account
  }
}

export default initPage(AccountPage, styles, mapStateToProps)
