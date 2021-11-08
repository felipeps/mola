import TypeORMHelper from '../../helpers/typeorm-helper'
import { FileTypeORM } from '../../models/file'
import { OrderTypeORM } from '../../models/order'
import { OrderTypeORMRepository } from './order'

describe('Order TypeORM Repository', () => {
  beforeEach(async () => {
    return await TypeORMHelper.createTestConnection([OrderTypeORM, FileTypeORM])
  })

  afterEach(async () => {
    await TypeORMHelper.clear()
    return await TypeORMHelper.close()
  })

  const makeSut = (): OrderTypeORMRepository => {
    return new OrderTypeORMRepository()
  }

  test('should return created orders on success', async () => {
    const fileRepository = makeSut()
    const file = await fileRepository.createBatch([
      {
        cod_fornecedor: 'any_cod_forcenedor',
        cod_prod: 'any_cod_prod',
        cliente: 'any_cliente',
        documento: 'any_documento',
        nome_prod: 'any_nome_prod',
        nome_categoria: 'any_nome_categoria',
        nome_fornecedor: 'any_nome_fornecedor',
        valor_original: 10,
        data_compra: new Date(new Date().toDateString()),
        valor_desconto: 2,
        valor_final: 8,
        data_pgto: new Date(new Date().toDateString()),
        data_devolucao: new Date(new Date().toDateString()),
        status_situacao: 'any_status_situacao',
        status_pgto: 'any_status_pgto',
        taxa_aplicada: 2,
        taxa_original: 4,
        id_file: 'any_id_file'
      }
    ])

    expect(file.length).toBeTruthy()
    expect(file[0].id).toBeTruthy()
  })
})
