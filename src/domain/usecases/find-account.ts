export interface AccountFound {
  id: string
  login: string
}

export interface FindAccount {
  find: (login: string, password: string) => Promise<AccountFound>
}
