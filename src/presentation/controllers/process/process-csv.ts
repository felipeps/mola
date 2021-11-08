import { CreateFile } from '../../../domain/usecases/create-file'
import { CreateOrder } from '../../../domain/usecases/create-order'
import { ProcessCSV } from '../../../domain/usecases/process-csv'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class ProcessCSVController implements Controller {
  private readonly processCSV: ProcessCSV
  private readonly createOrder: CreateOrder
  private readonly createFile: CreateFile

  constructor (processCSV: ProcessCSV, createOrder: CreateOrder, createFile: CreateFile) {
    this.processCSV = processCSV
    this.createOrder = createOrder
    this.createFile = createFile
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { filePath } = request.body

      if (!filePath) {
        return badRequest(new MissingParamError('file'))
      }

      const file = await this.createFile.create()
      const orders = await this.processCSV.process(filePath)
      const ordersWithFile = orders.map(order => ({
        ...order,
        id_file: file.id
      }))

      await this.createOrder.createBatch(ordersWithFile)

      return ok({
        message: 'Processed'
      })
    } catch (error) {
      console.error(error.message)
      return serverError()
    }
  }
}
