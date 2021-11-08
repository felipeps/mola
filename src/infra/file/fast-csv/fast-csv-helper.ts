import { CreateOrderModel } from '../../../domain/usecases/create-order'

const FastCSVHelper = {
  map (order: any): CreateOrderModel {
    let key: string
    const keys = Object.keys(order)
    let n = keys.length
    const orderMapped = {}
    const numberFields = ['valor_final', 'valor_desconto', 'valor_original', 'taxa_original', 'taxa_aplicada']
    const dateFields = ['data_devolucao', 'data_pgto', 'data_compra']

    while (n--) {
      key = keys[n]
      orderMapped[key.toLowerCase()] = order[key]

      if (numberFields.includes(key.toLowerCase())) {
        orderMapped[key.toLowerCase()] = parseFloat(orderMapped[key.toLowerCase()])
      }

      if (dateFields.includes(key.toLowerCase())) {
        const formattedDate = new Date(orderMapped[key.toLowerCase()])

        if (formattedDate instanceof Date && !isNaN(formattedDate.getTime())) {
          orderMapped[key.toLowerCase()] = new Date(orderMapped[key.toLowerCase()])
        } else {
          orderMapped[key.toLowerCase()] = new Date()
        }
      }
    }

    return orderMapped as CreateOrderModel
  }
}

export default FastCSVHelper
