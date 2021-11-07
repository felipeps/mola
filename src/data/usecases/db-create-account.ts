import { Account } from '../../domain/models/account'
import { CreateAccount, CreateAccountModel } from '../../domain/usecases/create-account'
import { Encrypter } from '../protocols/encrypter'

export class DbCreateAccount implements CreateAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async create (account: CreateAccountModel): Promise<Account> {
    await this.encrypter.encrypt(account.password)
    return await Promise.resolve(null)
  }
}
