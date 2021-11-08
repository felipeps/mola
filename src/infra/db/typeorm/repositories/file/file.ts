import { getRepository } from 'typeorm'
import { CreateFileRepository } from '../../../../../data/protocols/create-file-repository'
import { File } from '../../../../../domain/models/file'
import { FileTypeORM } from '../../models/file'

export class FileTypeORMRepository implements CreateFileRepository {
  async create (): Promise<File> {
    const repository = getRepository(FileTypeORM)
    const file = repository.create()
    await repository.save(file)

    return file
  }
}
