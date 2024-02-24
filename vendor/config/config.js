import dotenv from 'dotenv'
dotenv.config()
export const CONFIG = {
	APP_KEY: process.env.APP_KEY || 'Jayanta_mahato',
	DB_URL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/msVendor',
	PORT: process.env.PORT || 3002,
}
