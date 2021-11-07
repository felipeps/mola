import { InternalServerError } from '../errors/internal-server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error.message
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new InternalServerError()
  }
}
