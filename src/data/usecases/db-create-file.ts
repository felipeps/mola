import { File } from '../../domain/models/file'
import { CreateFile } from '../../domain/usecases/create-file'
import { CreateFileRepository } from '../protocols/create-file-repository'

export class DbCreateFile implements CreateFile {
  private readonly createFileRepository: CreateFileRepository

  constructor (createFileRepository: CreateFileRepository) {
    this.createFileRepository = createFileRepository
  }

  async create (): Promise<File> {
    const file = await this.createFileRepository.create()

    return file
  }
}
