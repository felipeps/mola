import * as csv from 'fast-csv'
import * as fs from 'fs'
import { FastCSVAdapter } from './fast-csv'

jest.mock('fast-csv', () => ({
  parse: jest.fn()
}))

jest.mock('fs', () => ({
  createReadStream: jest.fn().mockImplementation(() => {
    return {
      pipe: jest.fn().mockImplementation(() => {
        return {
          on: jest.fn().mockImplementation(() => {
            return {
              on: jest.fn().mockImplementation(() => {
                return {
                  on: jest.fn()
                }
              })
            }
          })
        }
      })
    }
  })
}))

const makeSut = (): FastCSVAdapter => {
  return new FastCSVAdapter()
}

describe('FastCSV Adater', () => {
  test('Should call fast csv', async () => {
    const sut = makeSut()
    const parseSpy = jest.spyOn(csv, 'parse')

    await sut.process('any_path')

    expect(parseSpy).toHaveBeenCalledTimes(1)
  })

  test('Should call create read stream', async () => {
    const sut = makeSut()
    const createReadStreamSpy = jest.spyOn(fs, 'createReadStream')

    await sut.process('any_path')

    expect(createReadStreamSpy).toHaveBeenCalledTimes(2)
  })
})
