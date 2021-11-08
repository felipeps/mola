import { DbCreateAccount } from '../../data/usecases/db-create-account'
import { DbFindAccount } from '../../data/usecases/db-find-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt/bcrypt-adapter'
import { AccountTypeORMRepository } from '../../infra/db/typeorm/repositories/account/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols/controller'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountTypeORMRepository = new AccountTypeORMRepository()
  const dbAddAccount = new DbCreateAccount(bcryptAdapter, accountTypeORMRepository)
  const dbFindAccount = new DbFindAccount(accountTypeORMRepository)
  const signUpController = new SignUpController(dbAddAccount, dbFindAccount)

  return signUpController
}
