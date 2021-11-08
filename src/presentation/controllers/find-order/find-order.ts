import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindOrdersController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { idFile } = request.params

      if (!idFile) {
        return badRequest(new MissingParamError('idFile'))
      }

      return ok({})
    } catch (error) {
      console.error(error.message)
      return serverError()
    }
  }
}
