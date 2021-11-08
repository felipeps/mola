import { CreateJWTAdapter } from './create-jwt-adapter'

const makeSut = (): CreateJWTAdapter => {
  return new CreateJWTAdapter()
}

describe('CreateJWT Adapter', () => {
  test('should return token', async () => {
    const sut = makeSut()
    const response = await sut.sign('secret', '1d', 'any_id')

    expect(response).toBeTruthy()
  })
})
