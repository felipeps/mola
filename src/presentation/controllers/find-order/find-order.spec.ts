import { Order } from '../../../domain/models/order'
import { FindOrder } from '../../../domain/usecases/find-order'
import { InternalServerError } from '../../errors/internal-server-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { OrderNotFound } from '../../errors/order-not-found-error'
import { FindOrdersController } from './find-order'

const makeFindOrder = (): FindOrder => {
  class FindOrderStub implements FindOrder {
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

  return new FindOrderStub()
}

interface SutTypes {
  sut: FindOrdersController
  findOrderStub: FindOrder
}

const makeSut = (): SutTypes => {
  const findOrderStub = makeFindOrder()
  const sut = new FindOrdersController(findOrderStub)

  return {
    sut,
    findOrderStub
  }
}

describe('FindOrders Controller', () => {
  test('should return 400 if no order id', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {}
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('id'))
  })

  test('should call find with correct value', async () => {
    const { sut, findOrderStub } = makeSut()
    const findSpy = jest.spyOn(findOrderStub, 'find')

    await sut.handle({
      params: {
        id: 'any_id'
      }
    })

    expect(findSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 400 if no order found', async () => {
    const { sut, findOrderStub } = makeSut()

    jest.spyOn(findOrderStub, 'find').mockImplementationOnce(async () => {
      return await Promise.resolve(undefined)
    })

    const response = await sut.handle({
      params: {
        id: 'any_id'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new OrderNotFound())
  })

  test('should return order on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        id: 'any_id'
      }
    })

    expect(response.body).toBeTruthy()
    expect(response.body.id).toBe('any_id')
  })

  test('should return 500 if find throws', async () => {
    const { sut, findOrderStub } = makeSut()

    jest.spyOn(findOrderStub, 'find').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.handle({
      params: {
        id: 'any_id'
      }
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new InternalServerError())
  })
})
