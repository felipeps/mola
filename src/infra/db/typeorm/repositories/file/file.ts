import { getRepository } from 'typeorm'
import { File } from '../../../../../domain/models/file'
import { CreateFile } from '../../../../../domain/usecases/create-file'
import { FileTypeORM } from '../../models/file'

export class FileTypeORMRepository implements CreateFile {
  async create (): Promise<File> {
    const repository = getRepository(FileTypeORM)
    const file = repository.create()
    await repository.save(file)

    return file
  }
}
