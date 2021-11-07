import request from 'supertest'
import TypeORMHelper from '../../infra/db/typeorm/helpers/typeorm-helper'
import { AccountTypeORM } from '../../infra/db/typeorm/models/account'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    return await TypeORMHelper.createTestConnection(AccountTypeORM)
  })

  afterAll(async () => {
    return await TypeORMHelper.close()
  })

  beforeEach(async () => {
    await TypeORMHelper.clear()
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        login: 'felipeps',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
