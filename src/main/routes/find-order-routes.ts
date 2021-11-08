import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeFindOrderController } from '../factories/find-order'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

export default (router: Router): void => {
  router.get('/order/find/:id', ensureAuthenticated, adaptRoute(makeFindOrderController()))
}
