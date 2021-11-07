import { Account } from '../../domain/models/account'
import { FindAccount } from '../../domain/usecases/find-account'
import { FindAccountRepository } from '../protocols/find-account-repository'
import { DbFindAccount } from './db-find-account'

const makeFindAccountRepositoryStub = (): FindAccount => {
  class FindAccountRepositoryStub implements FindAccount {
    async find (login: string, password: string): Promise<Account> {
      return {
        id: 'any_id',
        login: 'any_login',
        password: 'any_password'
      }
    }
  }

  return new FindAccountRepositoryStub()
}

interface SutTypes {
  sut: DbFindAccount
  findAccountRepository: FindAccountRepository
}

const makeSut = (): SutTypes => {
  const findAccountRepository = makeFindAccountRepositoryStub()
  const sut = new DbFindAccount(findAccountRepository)

  return {
    sut,
    findAccountRepository
  }
}

describe('DbFindAccount Usecase', () => {
  test('should call find with correct values', async () => {
    const { sut, findAccountRepository } = makeSut()
    const findSpy = jest.spyOn(findAccountRepository, 'find')

    await sut.find('any_login', 'any_password')

    expect(findSpy).toBeCalledWith('any_login', 'any_password')
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
