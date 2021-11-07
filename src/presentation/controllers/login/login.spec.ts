import { Account } from '../../../domain/models/account'
import { FindAccount } from '../../../domain/usecases/find-account'
import { AccountNotFoundError } from '../../errors/account-not-found-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { LoginController } from './login'

const makeFindAccountStub = (): FindAccount => {
  class FindAccountStub implements FindAccount {
    async find (login: string, password: string): Promise<Account> {
      return await Promise.resolve({
        id: 'any_id',
        login: 'any_login',
        password: 'any_password'
      })
    }
  }

  return new FindAccountStub()
}

interface SutTypes {
  sut: LoginController
  findAccount: FindAccount
}

const makeSut = (): SutTypes => {
  const findAccount = makeFindAccountStub()
  const sut = new LoginController(findAccount)

  return {
    sut,
    findAccount
  }
}

describe('Login Controller', () => {
  test('should return 400 if no login', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        password: 'any_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('login'))
  })

  test('should return 400 if no password', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        login: 'any_login'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  test('should call find account with correct values', async () => {
    const { sut, findAccount } = makeSut()
    const findSpy = jest.spyOn(findAccount, 'find')

    await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(findSpy).toBeCalledWith('any_login', 'any_password')
  })

  test('should return 400 if account does not exist', async () => {
    const { sut, findAccount } = makeSut()

    jest.spyOn(findAccount, 'find').mockImplementationOnce(() => {
      return null
    })

    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new AccountNotFoundError())
  })

  test('should return 500 if find account throws', async () => {
    const { sut, findAccount } = makeSut()

    jest.spyOn(findAccount, 'find').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(response.statusCode).toBe(500)
  })

  test('should return account if it exists', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(response.body).toEqual({
      id: 'any_id',
      login: 'any_login',
      password: 'any_password'
    })
  })
})
