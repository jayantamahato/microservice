import { FormattedData } from '../helper/dataFormat.js'
import { AdminService } from '../service/admin.service.js'
import { imageUploader } from '../utils/imageUploader.util.js'
const adminService = new AdminService()
//create

export const createAdmin = async (req, res, next) => {
	const { email, password, profileImage } = req.body
	let adminProfileImage = null
	if (profileImage) {
		adminProfileImage = await imageUploader(profileImage)
	}
	try {
		const result = await adminService.create({ email, password, profileImage: adminProfileImage })

		return res.status(200).json(result)
	} catch (error) {
		console.log(error.message)
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
//delete
export const deleteAdmin = async (req, res, next) => {
	try {
		const adminId = req.params.id
		console.log(adminId)
		const result = await adminService.delete({ adminId })
		return res.status(200).json(result)
	} catch (error) {
		console.log(error)
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
//get all admins

export const getAllAdmin = async (req, res, next) => {
	try {
		const result = await adminService.getAllAdmin()
		return res.status(200).json(result)
	} catch (error) {
		console.log(error)
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}

// sign in
export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const result = await adminService.signIn(email, password)
		return res.status(200).json(result)
	} catch (error) {
		console.log(error)
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}

export const updateStatus = async (req, res, next) => {
	try {
		const email = re.params.email

		const result = await adminService.changeStatus({ email })
		return res.status(200).json(result)
	} catch (error) {
		return res
			.status(error.statusCode)
			.json(error.statusCode)
			.json(FormattedData(false, 0, null, error.message))
	}
}
