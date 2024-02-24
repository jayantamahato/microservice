import mongoose, { connect } from 'mongoose'
import { CONFIG } from './config'
const URL = CONFIG.DB_URL

export const dbConnection = async () => {
	try {
		await mongoose.connect(URL)
		console.log('DataBase connected Successfully')
	} catch (error) {
		console.log('connection Failed' + error)
	}
}

export default dbConnection
