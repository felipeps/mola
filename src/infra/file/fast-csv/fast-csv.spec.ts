import * as csv from 'fast-csv'
import * as fs from 'fs'
import { FastCSVAdapter } from './fast-csv'

jest.mock('fast-csv', () => ({
  parse: jest.fn()
}))

jest.mock('fs', () => ({
  unlinkSync: jest.fn().mockImplementationOnce((path: string) => {
    return true
  }),
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
  test('should call fast csv', async () => {
    const sut = makeSut()
    const parseSpy = jest.spyOn(csv, 'parse')

    await sut.process('any_path')

    expect(parseSpy).toHaveBeenCalledTimes(1)
  })

  test('should call create read stream', async () => {
    const sut = makeSut()
    const createReadStreamSpy = jest.spyOn(fs, 'createReadStream')

    await sut.process('any_path')

    expect(createReadStreamSpy).toHaveBeenCalledTimes(2)
  })

  test('should call unlink with correct value', async () => {
    const sut = makeSut()
    const unlinkSyncSpy = jest.spyOn(fs, 'unlinkSync')

    await sut.process('any_path')

    expect(unlinkSyncSpy).toHaveBeenLastCalledWith('any_path')
  })
})
