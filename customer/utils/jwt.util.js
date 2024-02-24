import Jwt from 'jsonwebtoken'
import { CONFIG } from '../config/config.js'

//get signature

export const getSignature = async (payload) => {
	return Jwt.sign(payload, CONFIG.APP_KEY, { expiresIn: '1d' })
}

//validate

export const validateSignature = async (req) => {
	let signature = req.get('Authorization')
	try {
		if (signature) {
			let payload = await Jwt.verify(signature.split(' ')[1], CONFIG.APP_KEY)
			req.user = payload
			return true
		} else {
			return false
		}
	} catch (error) {
		console.log(error.message)
		return false
	}
}
