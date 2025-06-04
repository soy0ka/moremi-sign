import { getSignBuffer } from '@/utils/sign/creator'
import { NextFunction, Request, Response } from 'express'
import { encode } from 'punycode'

// GET /:text
export const createSign = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text } = req.params
		const buffer = await getSignBuffer(text)
		res.setHeader('Content-Type', 'image/webp')
		res.setHeader('Content-Disposition', `attachment; filename="moreimi-${encode(text)}.webp"`)
		res.send(buffer)
	} catch (error) {
		next(error)
	}
}
