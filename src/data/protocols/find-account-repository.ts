import { Account } from '../../domain/models/account'

export interface FindAccountRepository {
  find: (login: string) => Promise<Account>
}
