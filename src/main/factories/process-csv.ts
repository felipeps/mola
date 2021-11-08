import { ProcessCSVController } from '../../presentation/controllers/process/process-csv'
import { Controller } from '../../presentation/protocols/controller'

export const makeProcessCSVController = (): Controller => {
  const processCSVController = new ProcessCSVController()

  return processCSVController
}
