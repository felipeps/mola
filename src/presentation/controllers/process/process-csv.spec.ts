import { File } from '../../../domain/models/file'
import { Order } from '../../../domain/models/order'
import { CreateFile } from '../../../domain/usecases/create-file'
import { CreateOrder, CreateOrderModel } from '../../../domain/usecases/create-order'
import { ProcessCSV, ProcessOrderModel } from '../../../domain/usecases/process-csv'
import { InternalServerError } from '../../errors/internal-server-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { ProcessCSVController } from './process-csv'

const makeProcessCSV = (): ProcessCSV => {
  class ProcessCSVStub implements ProcessCSV {
    async process (filePath: string): Promise<ProcessOrderModel[]> {
      return [
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
          taxa_original: 4
        }
      ]
    }
  }

  return new ProcessCSVStub()
}

const makeCreateFile = (): CreateFile => {
  class CreateFileStub implements CreateFile {
    async create (): Promise<File> {
      return {
        id: 'any_id'
      }
    }
  }

  return new CreateFileStub()
}

const makeCreateOrder = (): CreateOrder => {
  class CreateOrderStub implements CreateOrder {
    async createBatch (orders: CreateOrderModel[]): Promise<Order[]> {
      return [
        {
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
          valor_final: '8',
          data_pgto: new Date(new Date().toDateString()),
          data_devolucao: new Date(new Date().toDateString()),
          status_situacao: 'any_status_situacao',
          status_pgto: 'any_status_pgto',
          taxa_aplicada: '2',
          taxa_original: '4',
          id_file: 'any_id_file'
        }
      ]
    }
  }

  return new CreateOrderStub()
}

interface SutTypes {
  sut: ProcessCSVController
  processCSVStub: ProcessCSV
  createOrderStub: CreateOrder
  createFileStub: CreateFile
}

const makeSut = (): SutTypes => {
  const processCSVStub = makeProcessCSV()
  const createOrderStub = makeCreateOrder()
  const createFileStub = makeCreateFile()
  const sut = new ProcessCSVController(processCSVStub, createOrderStub, createFileStub)

  return {
    sut,
    processCSVStub,
    createOrderStub,
    createFileStub
  }
}

describe('ProcessCSV Controller', () => {
  test('should return 400 if no file', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {}
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('file'))
  })

  test('should call create file', async () => {
    const { sut, createFileStub } = makeSut()
    const createSpy = jest.spyOn(createFileStub, 'create')

    await sut.handle({
      body: {
        filePath: 'any_path'
      }
    })

    expect(createSpy).toHaveBeenCalledTimes(1)
  })

  test('should call process csv with correct value', async () => {
    const { sut, processCSVStub } = makeSut()
    const processSpy = jest.spyOn(processCSVStub, 'process')

    await sut.handle({
      body: {
        filePath: 'any_path'
      }
    })

    expect(processSpy).toHaveBeenCalledWith('any_path')
  })

  test('should call create order with correct values', async () => {
    const { sut, createOrderStub } = makeSut()
    const createBatchSpy = jest.spyOn(createOrderStub, 'createBatch')

    await sut.handle({
      body: {
        filePath: 'any_path'
      }
    })

    expect(createBatchSpy).toHaveBeenCalledWith([
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
        id_file: 'any_id'
      }
    ])
  })

  test('should return success message on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        filePath: 'any_path'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBeTruthy()
  })

  test('should return 500 if process throws', async () => {
    const { sut, processCSVStub } = makeSut()

    jest.spyOn(processCSVStub, 'process').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.handle({
      body: {
        filePath: 'any_path'
      }
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new InternalServerError())
  })
})
