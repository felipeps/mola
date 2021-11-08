import { AccountFound, FindAccount } from '../../domain/usecases/find-account'
import { Encrypter } from '../protocols/encrypter'
import { FindAccountRepository } from '../protocols/find-account-repository'

export class DbFindAccount implements FindAccount {
  private readonly encrypter: Encrypter
  private readonly findAccountRepository: FindAccountRepository

  constructor (encrypter: Encrypter, findAccountRepository: FindAccountRepository) {
    this.encrypter = encrypter
    this.findAccountRepository = findAccountRepository
  }

  async find (login: string, password: string): Promise<AccountFound> {
    const hashedPassword = await this.encrypter.encrypt(password)
    const account = await this.findAccountRepository.find(login, hashedPassword)

    if (account) {
      delete account.password
    }

    return account
  }
}
