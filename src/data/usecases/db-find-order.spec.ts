import { Order } from '../../domain/models/order'
import { FindOrder } from '../../domain/usecases/find-order'
import { FindOrderRepository } from '../protocols/find-order-repository'
import { DbFindOrder } from './db-find-order'

const makeFindOrderRepository = (): FindOrderRepository => {
  class FindOrderRepositoryStub implements FindOrderRepository {
    async find (id: string): Promise<Order> {
      return {
        id: 'any_id',
        cod_fornecedor: 'any_cod_forcenedor',
        cod_prod: 'any_cod_prod',
        cliente: 'any_cliente',
        documento: 'any_documento',
        nome_prod: 'any_nome_prod',
        nome_categoria: 'any_nome_categoria',
        nome_fornecedor: 'any_nome_fornecedor',
        valor_original: '10',
        data_compra: new Date(new Date().toDateString()),
        valor_desconto: '2',
        valor_final: '3',
        data_pgto: new Date(new Date().toDateString()),
        data_devolucao: new Date(new Date().toDateString()),
        status_situacao: 'any_status_situacao',
        status_pgto: 'any_status_pgto',
        taxa_aplicada: '2',
        taxa_original: '4',
        id_file: 'any_id_file'
      }
    }
  }

  return new FindOrderRepositoryStub()
}

interface SutTypes {
  sut: FindOrder
  findOrderRepository: FindOrderRepository
}

const makeSut = (): SutTypes => {
  const findOrderRepository = makeFindOrderRepository()
  const sut = new DbFindOrder(findOrderRepository)

  return {
    sut,
    findOrderRepository
  }
}

describe('DbFindOrder Usecase', () => {
  test('should call find with correct values', async () => {
    const { sut, findOrderRepository } = makeSut()
    const findSpy = jest.spyOn(findOrderRepository, 'find')

    await sut.find('any_id')

    expect(findSpy).toBeCalledWith('any_id')
  })

  test('should return order found', async () => {
    const { sut } = makeSut()
    const order = await sut.find('any_id')

    expect(order).toEqual({
      id: 'any_id',
      cod_fornecedor: 'any_cod_forcenedor',
      cod_prod: 'any_cod_prod',
      cliente: 'any_cliente',
      documento: 'any_documento',
      nome_prod: 'any_nome_prod',
      nome_categoria: 'any_nome_categoria',
      nome_fornecedor: 'any_nome_fornecedor',
      valor_original: '10',
      data_compra: new Date(new Date().toDateString()),
      valor_desconto: '2',
      valor_final: '3',
      data_pgto: new Date(new Date().toDateString()),
      data_devolucao: new Date(new Date().toDateString()),
      status_situacao: 'any_status_situacao',
      status_pgto: 'any_status_pgto',
      taxa_aplicada: '2',
      taxa_original: '4',
      id_file: 'any_id_file'
    })
  })
})
