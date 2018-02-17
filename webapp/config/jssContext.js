// @flow weak
/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss'
import preset from 'jss-preset-default'
import { createMuiTheme } from 'material-ui/styles'
import indigo from 'material-ui/colors/indigo'
import orange from 'material-ui/colors/orange'
import red from 'material-ui/colors/red'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

// https://material-ui-next.com/customization/themes/
export function getTheme (config = {}) {
  return createMuiTheme({
    direction: (config.rtl ? 'rtl' : 'ltr'),
    palette: {
      primary: indigo,
      secondary: orange,
      error: red,
      // Used by `getContrastText()` to maximize the contrast between the
      // background and the text.
      contrastThreshold: 3,
      type: (config.dark ? 'dark' : 'light')
    }
  })
}

// default theme
const theme = getTheme()

// Configure JSS
const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName

function createContext () {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry()
  }
}

export function getContext () {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext()
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext()
  }

  return global.__INIT_MATERIAL_UI__
}
