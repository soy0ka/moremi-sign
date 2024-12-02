import { CustomError } from '@/classes/CustomError'
import { ApiStatusCode, CustomErrorCode } from '@/types/response'
import responseFormatter from '@/utils/formatter/response'
import { NextFunction, Request, Response } from 'express'

// ALL /hello
export const sayHello = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.method === 'GET') {
			const { name } = req.query
			res.status(ApiStatusCode.SUCCESS).json(responseFormatter.success({ name })).end()
		} else if (req.method === 'POST') {
			const { name } = req.body
			res.status(ApiStatusCode.SUCCESS).json(responseFormatter.success({ name })).end()
		} else {
			throw new CustomError(CustomErrorCode.METHOD_NOT_ALLOWED)
		}
	} catch (error) {
		next(error)
	}
}
