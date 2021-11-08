import { getRepository } from 'typeorm'
import { CreateAccountRepository } from '../../../../../data/protocols/create-account-repository'
import { FindAccountRepository } from '../../../../../data/protocols/find-account-repository'
import { Account } from '../../../../../domain/models/account'
import { CreateAccountModel } from '../../../../../domain/usecases/create-account'
import { AccountTypeORM } from '../../models/account'

export class AccountTypeORMRepository implements CreateAccountRepository, FindAccountRepository {
  async create (accountData: CreateAccountModel): Promise<Account> {
    const repository = getRepository(AccountTypeORM)
    const account = repository.create(accountData)
    await repository.save(account)

    return account
  }

  async find (login: string, password: string): Promise<Account> {
    const repository = getRepository(AccountTypeORM)
    const account = await repository.findOne({
      login,
      password
    })

    return account
  }
}
