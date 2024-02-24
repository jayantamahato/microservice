import { CONFIG } from '../config/config.js'
import { FormattedData } from '../utils/formatData.util.js'
import Jwt from 'jsonwebtoken'
export const authentication = async (req, res, next) => {
	const signature = req.get('Authorization')
	const payload = Jwt.verify(signature.split(' ')[1], CONFIG.APP_KEY)

	//check user role
	req.user = payload
	if (payload) {
		next()
	} else {
		return res.status(401).json(FormattedData(false, 0, null, 'Unauthorized'))
	}
}
