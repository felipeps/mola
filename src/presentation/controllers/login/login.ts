import { FindAccount } from '../../../domain/usecases/find-account'
import { AccountNotFoundError } from '../../errors/account-not-found-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoginController implements Controller {
  private readonly findAccount: FindAccount

  constructor (findAccount: FindAccount) {
    this.findAccount = findAccount
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['login', 'password']
      const { body } = request

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { login, password } = body

      const account = await this.findAccount.find(login, password)

      if (!account) {
        return badRequest(new AccountNotFoundError())
      }

      return ok(account)
    } catch (error) {
      console.error(error.message)
      return serverError()
    }
  }
}
