import Jwt from 'jsonwebtoken'
import { CONFIG } from '../config/config.js'
export const validateSignature = async (req) => {
	let signature = req.get('Authorization')

	try {
		if (signature) {
			let payload = await Jwt.verify(signature.split(' ')[1], CONFIG.APP_KEY)
			req.user = payload
			if (payload.role === 'admin' || payload.role === 'vendor') {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}
