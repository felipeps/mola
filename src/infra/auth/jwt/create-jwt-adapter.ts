import { sign } from 'jsonwebtoken'
import { CreateJWT } from '../../../domain/protocols/create-jwt'

export class CreateJWTAdapter implements CreateJWT {
  async sign (secret: string, expiresIn: string, subject: string): Promise<string> {
    const token = sign({}, secret, {
      expiresIn,
      subject
    })

    return token
  }
}
