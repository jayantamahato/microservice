import dotenv from 'dotenv'
dotenv.config()
export const CONFIG = {
	APP_KEY: process.env.APP_KEY || '',
	DB_URL: process.env.DB_URL || '',
	PORT: process.env.PORT || 3001,
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
	ADMIN_FOLDER: process.env.CLOUDINARY_FOLDER || '',
	EMAIL: process.env.EMAIL,
	PASS: process.env.PASSWORD,
}
