import { validateSignature } from '../utils/jwt.util.js'

export const authentication = async (req, res, next) => {
	const validate = await validateSignature(req)
	if (validate) {
		next()
	} else {
		return res.status(401).json({
			status: false,
			results: 0,
			data: {},
			message: 'unauthorized user',
		})
	}
}
