import AdminModel from '../models/admin.model.js'
class AdminRepository {
	//create admin
	Create = async ({ email, encPassword, salt, profilePicture }) => {
		try {
			const result = await AdminModel.create({ email: email, password: encPassword, salt: salt, profilePicture: profilePicture })
			return result
		} catch (error) {
			console.log(error)
			throw error
		}
	}
	//delete admin

	Delete = async ({ adminId }) => {
		try {
			const result = await AdminModel.findByIdAndDelete(adminId)
			return result
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	//get admin by email

	GetByEmail = async ({ email }) => {
		try {
			const result = await AdminModel.findOne({ email: email })
			return result
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	GetAllAdmin = async () => {
		try {
			const admin = await AdminModel.find({})
			return admin
		} catch (error) {
			throw error
		}
	}

	//update admin status
	UpdateStatus = async ({ email }) => {
		try {
			const result = await AdminModel.updateOne({ email: email }, { $set: { isVerified: true } })
			return result
		} catch (error) {
			throw error
		}
	}
}
export { AdminRepository }
