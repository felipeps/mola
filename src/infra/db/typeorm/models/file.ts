import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { File } from '../../../../domain/models/file'

@Entity('files')
export class FileTypeORM implements File {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
