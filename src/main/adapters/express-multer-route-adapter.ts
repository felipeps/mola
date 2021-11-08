import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'

interface MulterRequest extends Request {
  file?: any
}

export const adaptRoute = (controller: Controller) => {
  return async (req: MulterRequest, res: Response) => {
    req.body = {
      filePath: req.file?.path
    }
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers
    }
    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse)
  }
}
