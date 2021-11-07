import { Account } from '../../domain/models/account'
import { CreateAccountModel } from '../../domain/usecases/create-account'

export interface CreateAccountRepository {
  create: (accountData: CreateAccountModel) => Promise<Account>
}
