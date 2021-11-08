import bcrypt from 'bcrypt'
import { Encrypter } from '../../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (data: string): Promise<string> {
    const hash = await bcrypt.hash(data, this.salt)

    return hash
  }

  async compare (data: string, hashedData: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(data, hashedData)

    return isMatch
  }
}
