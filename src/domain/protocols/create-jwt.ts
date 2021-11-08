export interface CreateJWT {
  sign: (secret: string, expiresIn: string, subject: string) => Promise<string>
}
