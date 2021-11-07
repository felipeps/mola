import { Account } from '../../domain/models/account'
import { CreateAccount, CreateAccountModel } from '../../domain/usecases/create-account'
import { CreateAccountRepository } from '../protocols/add-account-repository'
import { Encrypter } from '../protocols/encrypter'
import { DbCreateAccount } from './db-create-account'

const makeEncrypt = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (data: string): Promise<string> {
      return await Promise.resolve('hash_password')
    }
  }

  return new EncrypterStub()
}

const makeCreateAccountRepository = (): CreateAccountRepository => {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create (accountData: CreateAccountModel): Promise<Account> {
      return await Promise.resolve({
        id: 'any_id',
        login: 'any_login',
        password: 'hash_password'
      })
    }
  }

  return new CreateAccountRepositoryStub()
}

interface SutTypes {
  sut: CreateAccount
  encrypter: Encrypter
  createAccountRepository: CreateAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypter = makeEncrypt()
  const createAccountRepository = makeCreateAccountRepository()
  const sut = new DbCreateAccount(encrypter, createAccountRepository)

  return {
    sut,
    encrypter,
    createAccountRepository
  }
}

describe('DbCreateAccount Usecase', () => {
  test('should call encrypter with password', async () => {
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')

    await sut.create({
      login: 'any_login',
      password: 'any_password'
    })

    expect(encryptSpy).toBeCalledWith('any_password')
  })

  test('should call create with correct values', async () => {
    const { sut, createAccountRepository } = makeSut()
    const createSpy = jest.spyOn(createAccountRepository, 'create')

    await sut.create({
      login: 'any_login',
      password: 'any_password'
    })

    expect(createSpy).toBeCalledWith({
      login: 'any_login',
      password: 'hash_password'
    })
  })

  test('should return account created', async () => {
    const { sut } = makeSut()

    const account = await sut.create({
      login: 'any_login',
      password: 'any_password'
    })

    expect(account).toEqual({
      id: 'any_id',
      login: 'any_login',
      password: 'hash_password'
    })
  })
})
