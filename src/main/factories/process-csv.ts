import { DbCreateFile } from '../../data/usecases/db-create-file'
import { DbCreateOrder } from '../../data/usecases/db-create-order'
import { FileTypeORMRepository } from '../../infra/db/typeorm/repositories/file/file'
import { OrderTypeORMRepository } from '../../infra/db/typeorm/repositories/order/order'
import { FastCSVAdapter } from '../../infra/file/fast-csv'
import { ProcessCSVController } from '../../presentation/controllers/process/process-csv'
import { Controller } from '../../presentation/protocols/controller'

export const makeProcessCSVController = (): Controller => {
  const fastCSVAdapter = new FastCSVAdapter()
  const createOrderRepository = new OrderTypeORMRepository()
  const createOrder = new DbCreateOrder(createOrderRepository)
  const createFileRepository = new FileTypeORMRepository()
  const createFile = new DbCreateFile(createFileRepository)
  const processCSVController = new ProcessCSVController(fastCSVAdapter, createOrder, createFile)

  return processCSVController
}
