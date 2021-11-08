import { ProcessCSV, ProcessOrderModel } from '../../domain/usecases/process-csv'

export class FastCSVAdapter implements ProcessCSV {
  async process (filePath: string): Promise<ProcessOrderModel[]> {
    return await Promise.resolve(null)
  }
}
