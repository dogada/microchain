// @flow

export default class HttpError extends Error {
  statusCode: number

  constructor (code: number, message?: string) {
    super(code < 500 ? message : 'Unknown error')
    this.name = this.constructor.name
    this.statusCode = code
    Error.captureStackTrace(this, this.constructor)
  }
}
