import { getRepository } from 'typeorm'
import { CreateOrderRepository } from '../../../../../data/protocols/create-order-repository'
import { Order } from '../../../../../domain/models/order'
import { CreateOrderModel } from '../../../../../domain/usecases/create-order'
import { OrderTypeORM } from '../../models/order'

export class OrderTypeORMRepository implements CreateOrderRepository {
  async createBatch (ordersData: CreateOrderModel[]): Promise<Order[]> {
    const repository = getRepository(OrderTypeORM)
    const orders = repository.create(ordersData)

    await repository.save(orders)

    return orders
  }
}
