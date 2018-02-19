// @flow
import withJss from './withJss'
import {reduxPage} from './redux'

const DEFAULT_TITLE = 'MicroChain'

export function pageTitle (title: ?string) {
  return title || DEFAULT_TITLE
}

/*
Return page component wrapped with Redux and Jss.
*/
export function initPage (
  comp: any,
  styles?: Object = {},
  mapStateToProps?: (state: Object, ownProps: Object) => Object,
  mapDispatchToProps?: (dispatch: Function, ownProps?: ?Object) => Object,
  mergeProps?: (stateProps: Object, dispatchProps: Object, ownProps: Object) => Object,
  reduxOptions?: Object) {
  return reduxPage(withJss(comp, styles), mapStateToProps, mapDispatchToProps, mergeProps)
}

export function serializeError (error: any) {
  return {
    name: error.name,
    message: error.message,
    statusCode: error.statusCode
  }
}
