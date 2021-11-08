export class LoginAlreadyExistsError extends Error {
  constructor () {
    super('Login already exists')
    this.name = 'LoginAlreadyExistsError'
  }
}
