import { Account } from '../models/account'

export interface CreateAccountModel {
  login: string
  password: string
}

export interface CreateAccount {
  create: (account: CreateAccountModel) => Promise<Account>
}
