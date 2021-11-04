import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignUpController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { body } = request
    const requiredFields = ['login', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (body.password !== body.passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }

    return await Promise.resolve(null)
  }
}
