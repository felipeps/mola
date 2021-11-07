import { getRepository } from 'typeorm'
import { CreateAccountRepository } from '../../../../../data/protocols/create-account-repository'
import { Account } from '../../../../../domain/models/account'
import { CreateAccountModel } from '../../../../../domain/usecases/create-account'
import { AccountTypeORM } from '../../models/account'

export class AccountTypeORMRepository implements CreateAccountRepository {
  async create (accountData: CreateAccountModel): Promise<Account> {
    const repository = getRepository(AccountTypeORM)
    const account = repository.create(accountData)
    await repository.save(account)

    return account
  }
}
