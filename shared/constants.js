// FIXME: bridge process.env to WebPack
// https://github.com/zeit/next.js/issues/1103
// or populate window.APP_ENV from process.env on server
let ENV = 'prod'
if (typeof window !== 'undefined') {
  ENV = {
    'localhost:3000': 'dev',
    'localhost:3001': 'qa'
  }[window.location.host] || 'prod'
}

const CONFIG = {
  dev: {
    API_ROOT: 'http://localhost:10010/v1/',
    MINER_ACCOUNT: 'DEV_MINER'
  },
  qa: {
    API_ROOT: 'http://localhost:10011/v1/',
    MINER_ACCOUNT: 'QA_MINER'
  },
  prod: {
    API_ROOT: 'https://api.mic.dogada.org/v1/',
    MINER_ACCOUNT: 'PROD_MINER'
  }
}

export const PROJECT_ID = 'microchain'
export const NS = PROJECT_ID
export const DRAWER_WIDTH = 240
export const DEV_MODE = (process.env.NODE_ENV === 'development')
export const API_ROOT = CONFIG[ENV].API_ROOT
export const MINER_ACCOUNT = CONFIG[ENV].MINER_ACCOUNT || 'MINER_ACCOUNT'
