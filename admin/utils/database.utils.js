import mongoose from 'mongoose'
import { CONFIG } from '../config/config.js'

export const dbConnection = async () => {
	const uri = CONFIG.DB_URL
	await mongoose
		.connect(uri)
		.then(() => {
			console.log('DataBase connected Successfully')
		})
		.catch((err) => {
			console.log('connection Failed' + err)
		})
}
