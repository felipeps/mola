import { Encrypter } from '../../../data/protocols/encrypter'
import { Account } from '../../../domain/models/account'
import { CreateJWT } from '../../../domain/protocols/create-jwt'
import { FindAccount } from '../../../domain/usecases/find-account'
import { AccountNotFoundError } from '../../errors/account-not-found-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { LoginController } from './login'

const makeFindAccountStub = (): FindAccount => {
  class FindAccountStub implements FindAccount {
    async find (login: string): Promise<Account> {
      return await Promise.resolve({
        id: 'any_id',
        login: 'any_login',
        password: 'hash_password'
      })
    }
  }

  return new FindAccountStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (data: string): Promise<string> {
      return await Promise.resolve('hash_password')
    }

    async compare (data: string, hashedData: string): Promise<boolean> {
      return true
    }
  }

  return new EncrypterStub()
}

const makeCreateJWTStub = (): CreateJWT => {
  class CreateJWTStub implements CreateJWT {
    async sign (secret: string, expiresIn: string, subject: string): Promise<string> {
      return 'jwt'
    }
  }

  return new CreateJWTStub()
}

interface SutTypes {
  sut: LoginController
  findAccount: FindAccount
  createJWT: CreateJWT
  encrypter: Encrypter
}

const makeSut = (): SutTypes => {
  const findAccount = makeFindAccountStub()
  const createJWT = makeCreateJWTStub()
  const encrypter = makeEncrypter()
  const sut = new LoginController(findAccount, createJWT, encrypter)

  return {
    sut,
    findAccount,
    createJWT,
    encrypter
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

    expect(findSpy).toBeCalledWith('any_login')
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

    expect(response.body.account).toEqual({
      id: 'any_id',
      login: 'any_login',
      password: 'hash_password'
    })
  })

  test('should call sign with correct values', async () => {
    const { sut, createJWT } = makeSut()
    const signSpy = jest.spyOn(createJWT, 'sign')
    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(signSpy).toBeCalledWith('secret', '1d', response.body.account.id)
  })

  test('should return jwt if account exists', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(response.body.jwt).toBeTruthy()
  })

  test('should call compare with correct values', async () => {
    const { sut, encrypter } = makeSut()
    const compareSpy = jest.spyOn(encrypter, 'compare')

    await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hash_password')
  })

  test('should return 400 if password does not match', async () => {
    const { sut, encrypter } = makeSut()

    jest.spyOn(encrypter, 'compare').mockImplementationOnce(async () => {
      return await Promise.resolve(false)
    })

    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'wrong_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new AccountNotFoundError())
  })
})
