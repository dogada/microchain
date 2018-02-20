// @flow
import React from 'react'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Table, {TableBody, TableHead, TableCell, TableRow} from 'material-ui/Table'
import AddressLink from '~/ui/AddressLink'
import type {Transaction} from '~/types'

const styles = (theme: Object) => ({
  root: {
    width: '100%',
    marginTop: 2 * theme.spacing.unit
  },
  table: {
    minWidth: 300
  }
})

type Props = {
  data: Array<Transaction>,
  classes: Object
}

function TransactionList ({ data, classes }: Props) {
  // index is bad key, but the list is immutable, so it's ok
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((transaction, i) => (
            <TableRow key={i}>
              <TableCell>
                <AddressLink address={transaction.from} />
              </TableCell>
              <TableCell>
                <AddressLink address={transaction.to} />
              </TableCell>
              <TableCell numeric>
                {transaction.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(TransactionList)
