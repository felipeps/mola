import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { MissingParamError } from '../../presentation/errors/missing-param-error'

export default function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new MissingParamError('jwt')
  } else {
    const [, token] = authHeader.split(' ')

    verify(token, 'secret')
  }
  next()
}
