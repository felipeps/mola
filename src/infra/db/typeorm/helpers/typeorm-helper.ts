import { createConnection, getConnection } from 'typeorm'

const TypeORMHelper = {
  async createTestConnection (modelToTest: any) {
    return await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [
        modelToTest
      ],
      synchronize: true,
      logging: false
    })
  },

  async create () {
    await createConnection()
  },

  async close () {
    await getConnection().close()
  },

  async clear () {
    const connection = getConnection()
    const entities = connection.entityMetadatas

    const entityDeletionPromises = entities.map((entity) => async () => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
    await Promise.all(entityDeletionPromises)
  }
}
export default TypeORMHelper
