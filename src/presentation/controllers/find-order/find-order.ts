import { FindOrder } from '../../../domain/usecases/find-order'
import { MissingParamError } from '../../errors/missing-param-error'
import { OrderNotFound } from '../../errors/order-not-found-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindOrdersController implements Controller {
  private readonly findOrder: FindOrder

  constructor (findOrder: FindOrder) {
    this.findOrder = findOrder
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params

      if (!id) {
        return badRequest(new MissingParamError('id'))
      }

      const order = await this.findOrder.find(id)

      if (!order) {
        return badRequest(new OrderNotFound())
      }

      return ok(order)
    } catch (error) {
      console.error(error.message)
      return serverError()
    }
  }
}
