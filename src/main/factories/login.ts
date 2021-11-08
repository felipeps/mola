import { LoginController } from '../../presentation/controllers/login/login'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController()

  return loginController
}
