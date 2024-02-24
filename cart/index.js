import express from 'express'
import { dbConnection } from './utils/database.utils.js'
import { CONFIG } from './config/config.js'
import cors from 'cors'
import { CartRouter } from './routes/cart.route.js'
import { consume } from './utils/rpc.util.js'
const PORT = CONFIG.PORT
const app = express()
export const startServer = async () => {
	await dbConnection()
	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	app.use(cors({
          origin: "*.localhost.com"
        }))
	app.use('/', CartRouter)
	app.listen(PORT, () => {
		console.clear()
		console.log('cart is running on port :', PORT)
	})
	await consume({ queueName: CONFIG.CART_QUEUE })
}

startServer()
