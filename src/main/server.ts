import TypeORMHelper from '../infra/db/typeorm/helpers/typeorm-helper'

TypeORMHelper.create()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(3000, () => console.log('Server running at http://localhost:3000'))
  })
  .catch(console.error)
