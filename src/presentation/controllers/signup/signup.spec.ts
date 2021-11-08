import { Account } from '../../../domain/models/account'
import { CreateAccount, CreateAccountModel } from '../../../domain/usecases/create-account'
import { FindAccount } from '../../../domain/usecases/find-account'
import { InternalServerError } from '../../errors/internal-server-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { LoginAlreadyExistsError } from '../../errors/login-already-exists-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { SignUpController } from './signup'

const makeCreateAccountStub = (): CreateAccount => {
  class CreateAccountStub implements CreateAccount {
    async create (account: CreateAccountModel): Promise<Account> {
      return {
        id: 'any_id',
        login: 'any_login',
        password: 'any_password'
      }
    }
  }

  return new CreateAccountStub()
}

const makeFindAccount = (): FindAccount => {
  class FindAccountStub implements FindAccount {
    async find (login: string): Promise<Account> {
      return undefined
    }
  }

  return new FindAccountStub()
}

interface SutTypes {
  createAccountStub: CreateAccount
  findAccountStub: FindAccount
  sut: SignUpController
}

const makeSut = (): SutTypes => {
  const createAccountStub = makeCreateAccountStub()
  const findAccountStub = makeFindAccount()
  const sut = new SignUpController(createAccountStub, findAccountStub)

  return {
    sut,
    createAccountStub,
    findAccountStub
  }
}

describe('SignUp Controller', () => {
  test('should return 400 if no login', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('login'))
  })

  test('should return 400 if no password', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        login: 'any_login',
        passwordConfirmation: 'any_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if no passwordConfirmation', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('should return 400 if password is diffent from the passwordConfirmation', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password',
        passwordConfirmation: 'wrong-password-confirmation'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('should call create account with correct values', async () => {
    const { sut, createAccountStub } = makeSut()
    const createSpy = jest.spyOn(createAccountStub, 'create')
    const newAccount = {
      login: 'any_login',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await sut.handle({
      body: newAccount
    })

    expect(createSpy).toHaveBeenCalledWith({
      login: 'any_login',
      password: 'any_password'
    })
  })

  test('should return new account created', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    const account = response.body

    expect(account.id).toBeTruthy()
  })

  test('should return 500 if CreateAccount throws', async () => {
    const { sut, createAccountStub } = makeSut()

    jest.spyOn(createAccountStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new InternalServerError())
  })

  test('should return 400 if login already exists', async () => {
    const { sut, findAccountStub } = makeSut()

    jest.spyOn(findAccountStub, 'find').mockImplementationOnce(async (): Promise<Account> => {
      return {
        id: 'any_id',
        login: 'any_login',
        password: 'any_password'
      }
    })

    const response = await sut.handle({
      body: {
        login: 'any_login',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new LoginAlreadyExistsError())
  })
})
