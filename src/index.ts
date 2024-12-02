import 'dotenv/config'

import http from 'http'
import app from './app'
import { Logger } from './utils/logger'

const port = process.env.ç || 3000
const server = http.createServer(app)

Logger.initialize('./')

server.listen(port, () => {
	Logger.success('Express').put('Server Ready').next('port').put(port).out()
})
