import { FormattedData } from '../helper/dataFormat.js'
import { CustomerRepository } from '../repository/customer.js'
import { getSignature } from '../utils/jwt.util.js'
import { generatePassword, generateSalt, validatePassword } from '../utils/password.util.js'
import { OtpService } from './otp.service.js'

const TAG = 'CUSTOMER SERVICE'

class CustomerService {
	constructor() {
		this.customerRepository = new CustomerRepository()
		this.otpService = new OtpService()
	}

	//registration
	async Create({ firstName, lastName, email, password, phone, address }) {
		try {
			const saltData = await generateSalt()
			const encPassword = await generatePassword({ password: password, salt: saltData })
			const customer = await this.customerRepository.createCustomer({ firstName, lastName, email, password: encPassword, phone, address, membership: 'free', verification: false, salt: saltData })
			return FormattedData(true, 1, customer, 'customer created')
		} catch (error) {
			console.log(error)
			return FormattedData(false, 0, {}, 'customer not created')
		}
	}
	//get profile
	async GetCustomerById({ id }) {
		try {
			const customer = await this.customerRepository.getCustomerById({ customerId: id })
			return FormattedData(true, 1, customer, 'customer found')
		} catch (error) {
			console.log(error)
			return FormattedData(false, 0, {}, 'customer not found')
		}
	}
	//delete profile
	async deleteCustomer({ customerId }) {
		try {
			const deleteResult = await this.customerRepository.deleteCustomer(customerId)

			return FormattedData(true, 1, deleteResult, 'customer deleted')
		} catch (error) {}
	}
	//update
	async updateCustomer({ id, firstName, lastName, email }) {
		try {
			console.log(id)
			const customer = await this.customerRepository.updateCustomerInfo({ id, firstName, lastName, email })
			return FormattedData(true, 1, customer, 'customer updated')
		} catch (error) {
			console.log(error)
			return FormattedData(false, 0, {}, 'customer not updated')
		}
	}

	//login

	async SignIn({ phone, password }) {
		try {
			const customer = await this.customerRepository.getCustomerByPhone({ phone })
			if (customer != null) {
				const isPasswordValid = await validatePassword(password, customer.password, customer.salt)
				if (isPasswordValid) {
					const payload = {
						id: customer._id,
						name: customer.first_name,
						no: customer.phone,
						role: 'customer',
					}
					const data = {
						token: await getSignature(payload),
					}
					customer.isLogedIn = true
					await customer.save()
					return FormattedData(true, 1, data, 'customer logged in')
				} else {
					return FormattedData(false, 0, {}, 'password not valid')
				}
			} else {
				return FormattedData(false, 0, {}, 'customer not found')
			}
		} catch (error) {
			console.log(error.message)
			return FormattedData(false, 0, {}, 'cannot login')
		}
	}
}
export { CustomerService }
