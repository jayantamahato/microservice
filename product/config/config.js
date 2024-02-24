import dotenv from 'dotenv'
dotenv.config()
export const CONFIG = {
	PORT: process.env.PORT || 3006,
	APP_KEY: process.env.APP_KEY || 'Jayanta_mahato',
	DB_URL: process.env.DB_URL || '',
	RPC_URL: process.env.MESSAGE_BROKER_URL || '',
	CART_QUEUE: process.env.CART_QUEUE || 'CART_QUEUE',
	PRODUCT_QUEUE: process.env.PRODUCT_QUEUE || 'PRODUCT_QUEUE',
}
