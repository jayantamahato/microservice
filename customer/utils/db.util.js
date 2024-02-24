import { mongoose } from 'mongoose'
import { CONFIG } from '../config/config.js'

export const dbConnection = async () => {
	try {
		const URL = CONFIG.DB_URL
		await mongoose.connect(URL)
		console.clear()
		console.log('Customer connected')
	} catch (error) {
		console.log('connection Failed' + error)
	}
}
