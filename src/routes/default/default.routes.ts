import { Router } from 'express'
import { createSign } from './default.controller'

const router = Router()

router.get('/:text', createSign)

export default router
