import { Router } from 'express'
import helloRoutes from './routes/hello/hello.routes'
const router = Router()

router.use('/hello', helloRoutes)

export default router
