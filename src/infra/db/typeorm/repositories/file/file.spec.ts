import TypeORMHelper from '../../helpers/typeorm-helper'
import { FileTypeORM } from '../../models/file'
import { FileTypeORMRepository } from './file'

describe('File TypeORM Repository', () => {
  beforeEach(async () => {
    return await TypeORMHelper.createTestConnection(FileTypeORM)
  })

  afterEach(async () => {
    await TypeORMHelper.clear()
    return await TypeORMHelper.close()
  })

  const makeSut = (): FileTypeORMRepository => {
    return new FileTypeORMRepository()
  }

  test('should return file account on success', async () => {
    const fileRepository = makeSut()
    const file = await fileRepository.create()

    expect(file).toBeTruthy()
    expect(file.id).toBeTruthy()
  })
})
