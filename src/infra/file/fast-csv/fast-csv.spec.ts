import * as csv from 'fast-csv'
import * as fs from 'fs'
import path from 'path'
import { FastCSVAdapter } from './fast-csv'

const makeSut = (): FastCSVAdapter => {
  return new FastCSVAdapter()
}

describe('FastCSV Adater', () => {
  let filePath: string

  beforeEach(() => {
    filePath = path.join(__dirname, '..', '..', '..', 'uploads', 'test-file.csv')
    fs.writeFileSync(filePath, 'COD_FORNECEDOR,COD_PROD\n345672,323')
  })

  test('should call fast csv', async () => {
    const sut = makeSut()
    const parseSpy = jest.spyOn(csv, 'parse')

    await sut.process(filePath)

    expect(parseSpy).toHaveBeenCalledTimes(1)
  })

  test('should return orders', async () => {
    const sut = makeSut()
    const orders = await sut.process(filePath)

    expect(orders.length).toBe(1)
  })
})
