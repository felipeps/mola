import { Order } from '../models/order'

export interface CreateOrderModel {
  cod_fornecedor: string
  cod_prod: string
  cliente: string
  documento: string
  nome_prod: string
  nome_categoria: string
  nome_fornecedor: string
  valor_original: number
  data_compra: Date
  valor_desconto: number
  valor_final: number
  data_pgto: Date
  data_devolucao: Date
  status_situacao: string
  status_pgto: string
  taxa_aplicada: number
  taxa_original: number
  id_file: string
}

export interface CreateOrder {
  createBatch: (ordersData: CreateOrderModel[]) => Promise<Order[]>
}
