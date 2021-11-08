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

  @Column({ type: 'numeric' })
  valor_original: string

  @Column()
  data_compra: Date

  @Column({ type: 'numeric' })
  valor_desconto: string

  @Column({ type: 'numeric' })
  valor_final: string

  @Column()
  data_pgto: Date

  @Column()
  data_devolucao: Date

  @Column()
  status_situacao: string

  @Column()
  status_pgto: string

  @Column({ type: 'numeric' })
  taxa_aplicada: string

  @Column({ type: 'numeric' })
  taxa_original: string

  @Column()
  id_file?: string

  @ManyToOne(() => FileTypeORM)
  @JoinColumn({ name: 'id_file' })
  file?: string
}
