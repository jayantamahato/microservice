import { FormattedData } from '../helper/dataFormat.js'
import { APIError, HttpStatusCode } from '../middleware/errorHandeller.js'
import { AdminRepository } from '../repository/admin.repository.js'
import { sendMail } from '../utils/email.util.js'
import { getSignature } from '../utils/jwt.util.js'
import { generatePassword, generateSalt, validatePassword } from '../utils/password.utils.js'

class AdminService {
	constructor() {
		this.admin = new AdminRepository()
	}
	//create admin

	create = async ({ email, password, profileImage }) => {
		if ((await this.admin.GetByEmail({ email })) != null) {
			throw new APIError(HttpStatusCode.NOT_FOUND, 'admin already exist')
		} else {
			const salt = await generateSalt()
			const encPassword = await generatePassword(password, salt)
			try {
				const data = await this.admin.Create({ email: email, encPassword: encPassword, salt: salt, profilePicture: profileImage })
				const url = `http://localhost/api/v1/admin/verify/${email}`
				await sendMail({ email: 'jmahato686@gmail.com', subject: 'Admin Permission', message: `${email} wants to be an admin Link: ${url}` })
				return FormattedData(true, 1, data, 'Admin created but not verified yet')
			} catch (error) {
				console.log(error)
				throw new APIError(HttpStatusCode.NOT_FOUND, error.message)
			}
		}
	}

	//delete admin

	delete = async ({ adminId }) => {
		try {
			const result = await this.admin.Delete({ adminId })
			if (result) {
				return FormattedData(true, 1, result, 'Admin deleted successfully')
			}
			throw new APIError(HttpStatusCode.NOT_FOUND, 'admin not deleted')
		} catch (error) {
			console.log(error)
			throw new APIError(HttpStatusCode.NOT_FOUND, error.message)
		}
	}

	//get all admins

	getAllAdmin = async () => {
		try {
			const data = await this.admin.GetAllAdmin()
			return FormattedData(true, data.length, data, 'Admins fetched successfully')
		} catch (error) {
			console.log(error)
			throw new APIError(HttpStatusCode.NOT_FOUND, error.message)
		}
	}

	//sign in

	signIn = async (email, password) => {
		try {
			const admin = await this.admin.GetByEmail({ email })
			if (admin) {
				if (await validatePassword({ password, savedPassword: admin.password, salt: admin.salt })) {
					const payload = {
						id: admin._id,
						email: admin.email,
						role: 'admin',
					}
					const token = await getSignature(payload)
					return FormattedData(true, 1, token, 'login successful')
				} else {
					throw new APIError(HttpStatusCode.NOT_FOUND, 'incorrect password')
				}
			} else {
				throw new APIError(HttpStatusCode.NOT_FOUND, 'admin not found')
			}
		} catch (error) {
			console.log(error)
			throw new APIError(HttpStatusCode.NOT_FOUND, error.message)
		}
	}

	changeStatus = async ({ email }) => {
		try {
			const res = await this.admin.UpdateStatus({ email })

			//send email to email
			await sendMail({ email, message: 'Your Admin Permission Granted You can Log in Now', subject: 'Admin Permission' })
			//your admin permission is granted by super admin
			return FormattedData(true, 1, res, 'updated')
		} catch (error) {
			throw new APIError(HttpStatusCode.NOT_FOUND, error.message)
		}
	}
}
export { AdminService }
