import { DbFindOrder } from '../../data/usecases/db-find-order'
import { OrderTypeORMRepository } from '../../infra/db/typeorm/repositories/order/order'
import { FindOrdersController } from '../../presentation/controllers/find-order/find-order'
import { Controller } from '../../presentation/protocols/controller'

export const makeFindOrderController = (): Controller => {
  const findOrderRepository = new OrderTypeORMRepository()
  const findOrder = new DbFindOrder(findOrderRepository)
  const findOrderController = new FindOrdersController(findOrder)

  return findOrderController
}
