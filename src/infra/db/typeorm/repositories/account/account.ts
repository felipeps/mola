import { getRepository, Repository } from 'typeorm'
import { CreateAccountRepository } from '../../../../../data/protocols/create-account-repository'
import { Account } from '../../../../../domain/models/account'
import { CreateAccountModel } from '../../../../../domain/usecases/create-account'
import { AccountTypeORM } from '../../models/account'

export class AccountTypeORMRepository implements CreateAccountRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(AccountTypeORM)
  }

  async create (accountData: CreateAccountModel): Promise<Account> {
    const account = this.ormRepository.create(accountData)
    await this.ormRepository.save(account)

    return account
  }
}
