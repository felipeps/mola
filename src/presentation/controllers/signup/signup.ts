import { CreateAccount } from '../../../domain/usecases/create-account'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignUpController implements Controller {
  private readonly createAccount: CreateAccount

  constructor (createAccount: CreateAccount) {
    this.createAccount = createAccount
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = request
      const requiredFields = ['login', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { login, password, passwordConfirmation } = body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const account = await this.createAccount.create({
        login,
        password
      })

      return ok(account)
    } catch (error) {
      console.error(error.message)
      return serverError()
    }
  }
}
