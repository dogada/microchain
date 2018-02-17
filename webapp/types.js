// @flow

export type Theme = {
  rtl?: boolean,
  dark?: boolean
}

export type HttpError = {
  statusCode?: number,
  message: string
}

export type JSONSchema = {
  id: string,
  version: number,
  title: string,
  description: string,
  type: string
}
