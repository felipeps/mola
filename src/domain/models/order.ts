export interface Order {
  id: string
  cod_fornecedor: string
  cod_prod: string
  cliente: string
  documento: string
  nome_prod: string
  nome_categoria: string
  nome_fornecedor: string
  valor_original: string
  data_compra: Date
  valor_desconto: string
  valor_final: string
  data_pgto: Date
  data_devolucao: Date
  status_situacao: string
  status_pgto: string
  taxa_aplicada: string
  taxa_original: string
  id_file?: string
}
