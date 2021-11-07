import { Account } from '../../domain/models/account'
import { FindAccount } from '../../domain/usecases/find-account'
import { FindAccountRepository } from '../protocols/find-account-repository'

export class DbFindAccount implements FindAccount {
  private readonly findAccountRepository: FindAccountRepository

  constructor (findAccountRepository: FindAccountRepository) {
    this.findAccountRepository = findAccountRepository
  }

  async find (login: string, password: string): Promise<Account> {
    const account = await this.findAccountRepository.find(login, password)

    if (account) {
      delete account.password
    }

    return account
  }
}
