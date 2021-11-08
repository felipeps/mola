import { File } from '../models/file'

export interface CreateFile {
  create: () => Promise<File>
}
