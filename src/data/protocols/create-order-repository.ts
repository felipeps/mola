import { Order } from '../../domain/models/order'
import { CreateOrderModel } from '../../domain/usecases/create-order'

export interface CreateOrderRepository {
  createBatch: (ordersData: CreateOrderModel[]) => Promise<Order[]>
}
