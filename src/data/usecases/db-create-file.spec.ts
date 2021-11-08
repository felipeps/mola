import { File } from '../../domain/models/file'
import { CreateFile } from '../../domain/usecases/create-file'
import { CreateFileRepository } from '../protocols/create-file-repository'
import { DbCreateFile } from './db-create-file'

const makeCreateFileRepository = (): CreateFileRepository => {
  class CreateFileRepositoryStub implements CreateFileRepository {
    async create (): Promise<File> {
      return await Promise.resolve({
        id: 'any_id'
      })
    }
  }

  return new CreateFileRepositoryStub()
}

interface SutTypes {
  sut: CreateFile
  createFileRepository: CreateFileRepository
}

const makeSut = (): SutTypes => {
  const createFileRepository = makeCreateFileRepository()
  const sut = new DbCreateFile(createFileRepository)

  return {
    sut,
    createFileRepository
  }
}

describe('DbCreateFile Usecase', () => {
  test('should call create', async () => {
    const { sut, createFileRepository } = makeSut()
    const createSpy = jest.spyOn(createFileRepository, 'create')

    await sut.create()

    expect(createSpy).toBeCalledTimes(1)
  })

  test('should return file created', async () => {
    const { sut } = makeSut()
    const account = await sut.create()

    expect(account).toEqual({
      id: 'any_id'
    })
  })
})
