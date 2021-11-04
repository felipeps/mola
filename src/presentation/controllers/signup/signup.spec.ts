import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { SignUpController } from './signup'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  test('should return 400 if no login', async () => {
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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
})
