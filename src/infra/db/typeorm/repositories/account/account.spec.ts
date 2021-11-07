import { CreateAccountRepository } from '../../../../../data/protocols/create-account-repository'
import TypeORMHelper from '../../helpers/typeorm-helper'
import { AccountTypeORM } from '../../models/account'
import { AccountTypeORMRepository } from './account'

describe('Account TypeORM Repository', () => {
  beforeEach(async () => {
    return await TypeORMHelper.createTestConnection(AccountTypeORM)
  })

  afterEach(async () => {
    await TypeORMHelper.clear()
    return await TypeORMHelper.close()
  })

  const makeSut = (): CreateAccountRepository => {
    return new AccountTypeORMRepository()
  }

  test('should return account on success', async () => {
    const accountRepository = makeSut()
    const account = await accountRepository.create({
      login: 'any_name',
      password: 'hash_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.login).toBeTruthy()
    expect(account.password).toBeTruthy()
  })
})
