import { Account } from '../models/account'

export interface FindAccount {
  find: (login: string, password: string) => Promise<Account>
}
