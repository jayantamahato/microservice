import express from 'express'
import cors from 'cors'
import { adminRouter } from './routes/admin.route.js'
import { dbConnection } from './utils/database.utils.js'
import { CONFIG } from './config/config.js'
import fileUpload from 'express-fileupload'

const app = express()
const PORT = CONFIG.PORT
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
	})
)
app.use('/', adminRouter)
app.listen(PORT, () => {
	console.log('admin is running on port :', PORT)
})
