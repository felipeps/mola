import { Order } from '../../domain/models/order'
import { FindOrder } from '../../domain/usecases/find-order'
import { FindOrderRepository } from '../protocols/find-order-repository'

export class DbFindOrder implements FindOrder {
  private readonly findOrderRepository: FindOrderRepository

  constructor (findOrderRepository: FindOrderRepository) {
    this.findOrderRepository = findOrderRepository
  }

  async find (id: string): Promise<Order> {
    const order = await this.findOrderRepository.find(id)

    return order
  }
}
