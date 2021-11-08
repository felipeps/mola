import { DbFindAccount } from '../../data/usecases/db-find-account'
import { CreateJWTAdapter } from '../../infra/auth/jwt/create-jwt-adapter'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt/bcrypt-adapter'
import { AccountTypeORMRepository } from '../../infra/db/typeorm/repositories/account/account'
import { LoginController } from '../../presentation/controllers/login/login'
import { Controller } from '../../presentation/protocols/controller'

export const makeLoginController = (): Controller => {
  const salt = 12
  const encryper = new BcryptAdapter(salt)
  const findAccountRepository = new AccountTypeORMRepository()
  const findAccount = new DbFindAccount(findAccountRepository)
  const createJWT = new CreateJWTAdapter()
  const loginController = new LoginController(findAccount, createJWT, encryper)

  return loginController
}
