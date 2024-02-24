import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { CONFIG } from './config/config.js'
import { dbConnection } from './utils/db.utils.js'
import router from './routes/routes.js'
import { consume } from './utils/rpc.util.js'
const app = express()
const PORT = CONFIG.PORT
const startServer = async () => {
	await dbConnection()
	app.use(express.json())
	app.use(
		cors({
			origin: '*.localhost.com',
		})
	)
	app.use(
		fileUpload({
			useTempFiles: true,
			// limits
		})
	)
	app.use('/', router)
	app.listen(PORT, () => {
		console.log('app is running on port :', PORT)
	})
	await consume({ queueName: CONFIG.PRODUCT_QUEUE })
}
startServer()
