import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from '../../../../domain/models/account'

@Entity('accounts')
export class AccountTypeORM implements Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  login: string

  @Column()
  password: string
}
