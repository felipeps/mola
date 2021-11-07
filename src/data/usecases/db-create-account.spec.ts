import { CreateAccount } from '../../domain/usecases/create-account'
import { Encrypter } from '../protocols/encrypter'
import { DbCreateAccount } from './db-create-account'

const makeEncryptStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (data: string): Promise<string> {
      return await Promise.resolve('hash_password')
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: CreateAccount
  encrypter: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypter = makeEncryptStub()
  const sut = new DbCreateAccount(encrypter)

  return {
    sut,
    encrypter
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
})
