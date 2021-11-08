import { File } from '../../domain/models/file'

export interface CreateFileRepository {
  create: () => Promise<File>
}
