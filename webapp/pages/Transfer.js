// @flow
import config from '~/config'
import * as React from 'react'
import Button from 'material-ui/Button'
import { SchemaForm, utils } from 'material-ui-schema-form'
import {initPage} from '~/config/page'
import BaseLayout from '~/ui/BaseLayout'
import {Router} from '~/routes'
import {Headline} from '~/ui/typography'
import {makeTransfer} from '~/store/accounts'
import TransactionSchema from '~/shared/schemas/transaction'
import type {Transaction} from '~/types'

const debug = config.debug('TransferPage')

type ProvidedProps = {
  dispatch: Function,
  classes: Object
}

type State = {
  model: Transaction,
  valid: boolean
}

const styles = theme => ({
  button: {
    marginTop: 3 * theme.spacing.unit
  },
  header: {
    marginBottom: 1 * theme.spacing.unit
  }
})

class TransferPage extends React.PureComponent<ProvidedProps, State> {
  static form = ['from', 'to', 'amount']
  constructor (props) {
    super(props)
    this.state = {
      model: {
        to: '',
        from: '',
        amount: 0
      },
      valid: false
    }
  }

  onModelChange = (key, val) => {
    let {model} = this.state
    utils.selectOrSet(key, model, val)
    this.setState({
      valid: utils.validateBySchema(TransactionSchema, model).valid
    })
  }

  onSubmit = () => {
    let {model} = this.state
    this.props.dispatch(makeTransfer(model))
      .then(_ => Router.pushRoute('/'))
  }

  render () {
    let {classes} = this.props
    let {model, valid} = this.state
    return (
      <BaseLayout title='Transfer page'>
        <Headline className={classes.header}>Make a transfer</Headline>
        <SchemaForm
          schema={TransactionSchema}
          form={TransferPage.form}
          model={model}
          onModelChange={this.onModelChange}
        />
        <Button
          disabled={!valid}
          className={classes.button}
          variant='raised'
          onClick={this.onSubmit}
          color='primary'
        >
          Submit
        </Button>
      </BaseLayout>
    )
  }
}

export default initPage(TransferPage, styles)
