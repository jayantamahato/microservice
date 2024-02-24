import dotenv from 'dotenv'
dotenv.config()
export const CONFIG = {
	APP_KEY: process.env.APP_KEY || '',
	DB_URL: process.env.DB_URL || '',
	PORT: process.env.PORT || 3004,
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
}
