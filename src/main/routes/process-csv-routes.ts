import multer from 'multer'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-multer-route-adapter'
import { makeProcessCSVController } from '../factories/process-csv'
import path from 'path'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const upload = multer({ dest: path.join(__dirname, '../', '../', 'uploads/') })

export default (router: Router): void => {
  router.post('/process', ensureAuthenticated, upload.single('file'), adaptRoute(makeProcessCSVController()))
}
