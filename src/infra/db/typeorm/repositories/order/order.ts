import { getRepository } from 'typeorm'
import { CreateOrderRepository } from '../../../../../data/protocols/create-order-repository'
import { FindOrderRepository } from '../../../../../data/protocols/find-order-repository'
import { Order } from '../../../../../domain/models/order'
import { CreateOrderModel } from '../../../../../domain/usecases/create-order'
import { OrderTypeORM } from '../../models/order'

export class OrderTypeORMRepository implements CreateOrderRepository, FindOrderRepository {
  async createBatch (ordersData: CreateOrderModel[]): Promise<Order[]> {
    const repository = getRepository(OrderTypeORM)
    const orders = repository.create(ordersData)

    await repository.save(orders)

    return orders
  }

  async find (id: string): Promise<Order> {
    const repository = getRepository(OrderTypeORM)
    const order = await repository.findOne({
      where: {
        id
      }
    })

    return order
  }
}
