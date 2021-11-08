import { Order } from '../../domain/models/order'
import { CreateOrder } from '../../domain/usecases/create-order'
import { CreateOrderRepository } from '../protocols/create-order-repository'
import { DbCreateOrder } from './db-create-order'

const makeCreateOrderRepository = (): CreateOrderRepository => {
  class CreateOrderRepositoryStub implements CreateOrderRepository {
    async createBatch (): Promise<Order[]> {
      return await Promise.resolve([{
        id: 'any_id',
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
      }])
    }
  }

  return new CreateOrderRepositoryStub()
}

interface SutTypes {
  sut: CreateOrder
  createOrderRepository: CreateOrderRepository
}

const makeSut = (): SutTypes => {
  const createOrderRepository = makeCreateOrderRepository()
  const sut = new DbCreateOrder(createOrderRepository)

  return {
    sut,
    createOrderRepository
  }
}

describe('DbCreateOrder Usecase', () => {
  test('should call create with correct values', async () => {
    const { sut, createOrderRepository } = makeSut()
    const createSpy = jest.spyOn(createOrderRepository, 'createBatch')

    await sut.createBatch([
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

    expect(createSpy).toBeCalledWith([
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
  })

  test('should return orders created', async () => {
    const { sut } = makeSut()
    const account = await sut.createBatch([
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

    expect(account).toEqual([{
      id: 'any_id',
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
    }])
  })
})
