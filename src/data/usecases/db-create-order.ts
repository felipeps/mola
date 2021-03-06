import { Order } from '../../domain/models/order'
import { CreateOrder, CreateOrderModel } from '../../domain/usecases/create-order'
import { CreateOrderRepository } from '../protocols/create-order-repository'

export class DbCreateOrder implements CreateOrder {
  private readonly createOrderRepository: CreateOrderRepository

  constructor (createOrderRepository: CreateOrderRepository) {
    this.createOrderRepository = createOrderRepository
  }

  async createBatch (ordersData: CreateOrderModel[]): Promise<Order[]> {
    const orders = await this.createOrderRepository.createBatch(ordersData)

    return orders
  }
}
