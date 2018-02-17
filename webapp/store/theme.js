// @flow
import {ns} from '~/config'
import {namespaceConfig} from 'fast-redux'
import type {Theme} from '~/types'

type State = Theme

export const {
  action,
  getState: getTheme
} = namespaceConfig(ns('theme'), {
  dark: false,
  rtl: false
})

export const updateTheme = action('updateTheme', (state: State, diff) => ({
  ...state,
  ...diff
}))
