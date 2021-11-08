import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from '../../../../domain/models/order'
import { FileTypeORM } from './file'

@Entity('orders')
export class OrderTypeORM implements Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  cod_fornecedor: string

  @Column()
  cod_prod: string

  @Column()
  cliente: string

  @Column()
  documento: string

  @Column()
  nome_prod: string

  @Column()
  nome_categoria: string

  @Column()
  nome_fornecedor: string

  @Column()
  valor_original: number

  @Column()
  data_compra: Date

  @Column()
  valor_desconto: number

  @Column()
  valor_final: number

  @Column()
  data_pgto: Date

  @Column()
  data_devolucao: Date

  @Column()
  status_situacao: string

  @Column()
  status_pgto: string

  @Column()
  taxa_aplicada: number

  @Column()
  taxa_original: number

  @Column()
  id_file?: string

  @ManyToOne(() => FileTypeORM)
  @JoinColumn({ name: 'user_id' })
  file?: string
}
