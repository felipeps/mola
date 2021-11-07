import { Account } from '../../domain/models/account'
import { CreateAccount, CreateAccountModel } from '../../domain/usecases/create-account'
import { CreateAccountRepository } from '../protocols/create-account-repository'
import { Encrypter } from '../protocols/encrypter'

export class DbCreateAccount implements CreateAccount {
  private readonly encrypter: Encrypter
  private readonly createAccountRepository: CreateAccountRepository

  constructor (encrypter: Encrypter, createAccountRepository: CreateAccountRepository) {
    this.encrypter = encrypter
    this.createAccountRepository = createAccountRepository
  }

  async create (accountData: CreateAccountModel): Promise<Account> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.createAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}
