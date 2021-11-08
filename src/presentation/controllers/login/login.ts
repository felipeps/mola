import { Encrypter } from '../../../data/protocols/encrypter'
import { CreateJWT } from '../../../domain/protocols/create-jwt'
import { FindAccount } from '../../../domain/usecases/find-account'
import { AccountNotFoundError } from '../../errors/account-not-found-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoginController implements Controller {
  private readonly findAccount: FindAccount
  private readonly createJWT: CreateJWT
  private readonly encrypter: Encrypter

  constructor (findAccount: FindAccount, createJWT: CreateJWT, encrypter: Encrypter) {
    this.findAccount = findAccount
    this.createJWT = createJWT
    this.encrypter = encrypter
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
      const account = await this.findAccount.find(login)

      if (!account) {
        return badRequest(new AccountNotFoundError())
      }

      const passwordMatched = await this.encrypter.compare(password, account.password)

      if (!passwordMatched) {
        return badRequest(new AccountNotFoundError())
      }

      const jwt = await this.createJWT.sign('secret', '1d', account.id)

      return ok({
        jwt,
        account
      })
    } catch (error) {
      console.error(error.message)
      return serverError()
    }
  }
}
