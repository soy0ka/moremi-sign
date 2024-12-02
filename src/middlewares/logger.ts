import { dateToTimeString } from '@/utils/formatter/date'
import { LogColor, Logger } from '@/utils/logger'
import { NextFunction, Request, Response } from 'express'

const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const startTime = Date.now()

	const userAgent = req.headers['user-agent']
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

	res.on('finish', () => {
		const finishedTime = Date.now()
		const responseTime = finishedTime - startTime

		const baseLog = Logger.log(String(res.statusCode))
			.put(`${req.method} ${req.originalUrl}`)
			.next('IP')
			.put(ip)
			.next('user-agent')
			.put(userAgent)

		const responseTimeView = `${responseTime}ms (${dateToTimeString(startTime)} ~ ${dateToTimeString(finishedTime)})`
		if (responseTime > 1000) {
			Logger.warning().put('Response Time is too long').out()
			baseLog.next('Response Time').putS([LogColor.F_RED], responseTimeView)
		} else if (responseTime > 500) {
			baseLog.next('Response Time').putS([LogColor.F_YELLOW], responseTimeView)
		} else if (responseTime < 100) {
			baseLog.next('Response Time').putS([LogColor.F_GREEN], responseTimeView)
		} else {
			baseLog.next('Response Time').put(responseTimeView)
		}

		baseLog.out()
	})
	next()
}

export default logMiddleware
