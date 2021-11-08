import { Account } from '../../domain/models/account'
import { FindAccount } from '../../domain/usecases/find-account'
import { Encrypter } from '../protocols/encrypter'
import { FindAccountRepository } from '../protocols/find-account-repository'
import { DbFindAccount } from './db-find-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (data: string): Promise<string> {
      return await Promise.resolve('hash_password')
    }
  }

  return new EncrypterStub()
}

const makeFindAccountRepository = (): FindAccountRepository => {
  class FindAccountRepositoryStub implements FindAccountRepository {
    async find (login: string, password: string): Promise<Account> {
      return {
        id: 'any_id',
        login: 'any_login',
        password: 'hash_password'
      }
    }
  }

  return new FindAccountRepositoryStub()
}

interface SutTypes {
  sut: FindAccount
  findAccountRepository: FindAccountRepository
  encrypter: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypter = makeEncrypter()
  const findAccountRepository = makeFindAccountRepository()
  const sut = new DbFindAccount(encrypter, findAccountRepository)

  return {
    sut,
    findAccountRepository,
    encrypter
  }
}

describe('DbFindAccount Usecase', () => {
  test('should call find with correct values', async () => {
    const { sut, findAccountRepository } = makeSut()
    const findSpy = jest.spyOn(findAccountRepository, 'find')

    await sut.find('any_login', 'any_password')

    expect(findSpy).toBeCalledWith('any_login', 'hash_password')
  })

  test('should call encrypt correct value', async () => {
    const { sut, encrypter } = makeSut()
    const encrypterSpy = jest.spyOn(encrypter, 'encrypt')

    await sut.find('any_login', 'any_password')

    expect(encrypterSpy).toBeCalledWith('any_password')
  })

  test('should return result of find if it is null', async () => {
    const { sut, findAccountRepository } = makeSut()

    jest.spyOn(findAccountRepository, 'find').mockImplementationOnce(() => {
      return null
    })

    const account = await sut.find('any_login', 'any_password')

    expect(account).not.toBeTruthy()
  })

  test('should return result of find if it is an account', async () => {
    const { sut } = makeSut()
    const account = await sut.find('any_login', 'any_password')

    expect(account).toEqual({
      id: 'any_id',
      login: 'any_login'
    })
  })

  test('should not return password', async () => {
    const { sut } = makeSut()
    const account = await sut.find('any_login', 'any_password')

    expect(account).toEqual({
      id: 'any_id',
      login: 'any_login'
    })
  })
})
