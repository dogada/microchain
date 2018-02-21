import Link from '~/ui/Link'
import Button from 'material-ui/Button'

export default ({index}) => (
  <Link route='block' params={{ index }}>
    <Button>{index}</Button>
  </Link>
)
