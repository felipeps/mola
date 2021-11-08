import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'fast-csv'
import { ProcessCSV, ProcessOrderModel } from '../../../domain/usecases/process-csv'

export class FastCSVAdapter implements ProcessCSV {
  async process (filePath: string): Promise<ProcessOrderModel[]> {
    const orders = []

    fs.createReadStream(path.resolve(filePath))
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', row => orders.push(row))
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))

    fs.unlinkSync(filePath)

    return orders
  }
}
