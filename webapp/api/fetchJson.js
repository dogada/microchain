// @flow

import HttpError from '~/utils/HttpError'
import {API_ROOT} from '~/shared/constants'

function parseJsonResponse (res) {
  var contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json()
  }
  throw new HttpError(400, "Oops, we haven't got JSON!")
}

function parseResponse (res) {
  return parseJsonResponse(res).then(data => {
    // console.log('data', data)
    if (res.ok) return data
    throw new HttpError(res.status, data.error || res.statusText)
  })
}

function queryParams (params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

export default function fetchJson (url: string, opts?: Object) {
  if (typeof window === 'undefined') {
    console.error('No window on server')
    return Promise.reject(new Error('No window'))
  }
  opts = {
    ...opts,
    credentials: 'same-origin', // send cookies
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (typeof opts.body === 'object') {
    opts.body = JSON.stringify(opts.body)
  }
  let qs = opts.query ? `?${queryParams(opts.query)}` : ''
  return window
    .fetch(`${API_ROOT}${url}${qs}`, opts)
    .then(parseResponse)
}
