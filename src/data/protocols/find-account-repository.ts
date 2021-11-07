import { Account } from '../../domain/models/account'

export interface FindAccountRepository {
  find: (login: string, password: string) => Promise<Account>
}
