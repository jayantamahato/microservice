import express from 'express'
import cors from 'cors'
import { dbConnection } from './utils/db.util.js'
import { CONFIG } from './config/config.js'
import { router } from './routes/customer.route.js'
const app = express()

const startServer = async () => {
	try {
		const PORT = CONFIG.PORT
		app.use(express.json())
		app.use(
			cors({
				origin: '*.localhost.com',
			})
		)
		app.use('/', router)
		await dbConnection()
		app.listen(PORT, () => {
			console.log('Customer is running on port :', PORT)
		})
	} catch (error) {
		console.log(error)
	}
}
startServer()
