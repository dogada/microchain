import Typography from 'material-ui/Typography'

function typo (type, props) {
  return (<Typography variant={type}>{props.children}</Typography>)
}

export const Display1 = typo.bind(null, 'display1')
export const Display2 = typo.bind(null, 'display2')
export const Title = typo.bind(null, 'title')

export const Headline = typo.bind(null, 'headline')
export const Subheading = typo.bind(null, 'subheading')
export const Body1 = typo.bind(null, 'body1')
export const Body2 = typo.bind(null, 'body2')
export const Caption = typo.bind(null, 'caption')

export {Typography}
