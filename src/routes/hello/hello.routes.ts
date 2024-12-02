import { Router } from 'express'
import { sayHello } from './hello.controller'

const router = Router()

router.use('/', sayHello)

export default router
