import { Order } from '../models/order'

export interface FindOrder {
  find: (id: string) => Promise<Order>
}
