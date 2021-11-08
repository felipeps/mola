import { Order } from '../../domain/models/order'

export interface FindOrderRepository {
  find: (id: string) => Promise<Order>
}
