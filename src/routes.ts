import { Router } from 'express'
import defaultRouter from './routes/default/default.routes'
const router = Router()

router.use('/', defaultRouter)

export default router
