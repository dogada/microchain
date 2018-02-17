// @flow

type DebugLogger = (message: string, ...any) => void

// FIXME: move to types
export type Config = {
  debug: (...path: string[]) => DebugLogger
}

const namespace = (...parts: Array<string>) => parts.join(':')
export const ns = namespace.bind(null, 'microchain')

const initialConfig = {
  debug (...path: string[]) {
    return require('debug')(ns(...path))
  }
}

export default initialConfig
