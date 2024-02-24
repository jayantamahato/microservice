import dotenv from 'dotenv'
dotenv.config()
export const CONFIG = {
	APP_KEY: process.env.APP_KEY || '',
	DB_URL: process.env.DB_URL || '',
	PORT: process.env.PORT || 3003,
	RPC_URL: process.env.MESSAGE_BROKER_URL || '',
	CART_QUEUE: process.env.CART_QUEUE || 'CART_QUEUE',
	PRODUCT_QUEUE: process.env.PRODUCT_QUEUE || 'PRODUCT_QUEUE',

}
