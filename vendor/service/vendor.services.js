import { FormattedData } from '../helper/dataFormat.js'
import { VendorRepository } from '../repository/vendor.repository.js'
import { getSignature } from '../utils/jwt.util.js'
import { generatePassword, generateSalt, validatePassword } from '../utils/password.util.js'

class VendorService {
	constructor() {
		this.repository = new VendorRepository()
	}

	//sign up

	async Create({ name, email, ownerName, phone, address, shopType, password }) {
		try {
			if (await this.repository.VendorByEmail({ email })) {
				return FormattedData(false, 0, {}, 'vendor already exist')
			} else {
				const salt = await generateSalt()
				const encPass = await generatePassword({ password, salt })
				const vendor = await this.repository.Create({ name, email, ownerName, phone, address, shopType, encPass, salt, isEnable: false })
				if (vendor) {
					return FormattedData(true, 0, vendor, 'vendor created successfully')
				} else {
					return FormattedData(false, 0, {}, 'error occurred')
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	//vendor login

	async SignIn(email, password) {
		const vendor = await this.repository.VendorByEmail({ email })
		if (vendor == null) {
			return FormattedData(false, 0, {}, ' vendor not found')
		} else {
			if (await validatePassword(password, vendor.password, vendor.salt)) {
				const payload = {
					id: vendor.id,
					email: vendor.email,
					role: 'vendor',
				}

				const token = await getSignature(payload)
				return FormattedData(true, 0, { token: token }, 'login success')
			} else {
				return FormattedData(false, 0, {}, 'login failed')
			}
		}
	}

	//vendor information

	async GetVendorByID({ id }) {
		const vendor = await this.repository.VendorByID({ id })
		if (vendor != null) {
			return FormattedData(true, 1, vendor, 'authorized vendor')
		} else {
			return FormattedData(false, 0, {}, 'vendor not found')
		}
	}

	//update vendor information

	async Update({ String: id, String: name, String: email, String: ownerName, int: phone, String: address, String: shopType }) {
		const vendor = await this.repository.VendorByEmail({ email })
		if (vendor != null) {
			const data = await this.repository.UpdateInformation({ id, name, email, ownerName, phone, address, shopType })
			return FormattedData(true, 1, data, ' vendor successfully updated')
		} else {
			return FormattedData(false, 0, {}, ' vendor not found')
		}
	}

	//update vendor service

	async UpdateVendorService({ email }) {
		const vendor = await this.repository.VendorByEmail({ email }) //checking is user exist or not
		if (vendor !== null) {
			const status = !vendor.isEnable
			const data = this.repository.UpdateStatus({ id: vendor.id, status })
			return FormattedData(true, 1, data, 'vendor service updated')
		} else {
			return FormattedData(false, 0, {}, 'vendor not found')
		}
	}

	//delete vendor

	async DeleteVendor({ id }) {
		try {
			const data = await this.repository.DeleteVendor({ id })
			if (data) {
				return FormattedData(true, 0, data, 'vendor deleted')
			} else {
				return FormattedData(true, 0, data, 'vendor not found')
			}
		} catch (error) {
			console.log(error)
		}
	}

	//get all vendors

	async GetAllVendors() {
		try {
			const data = await this.repository.AllVendors({})
			return FormattedData(true, 1, data, 'vendor found')
		} catch (error) {
			console.log(error)
			return FormattedData(false, 0, {}, 'vendor not found')
		}
	}
}
export { VendorService }
