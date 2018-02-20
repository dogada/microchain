import Link from '~/ui/Link'
import Button from 'material-ui/Button'

export default ({address}) => (
  <Link route='account' params={{ address }}>
    <Button>{address}</Button>
  </Link>
)
