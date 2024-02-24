import { CustomerModel } from '../models/customer.model.js'

class CustomerRepository {
	static TAG = 'CUSTOMER REPOSITORY'

	// easting customer check

	async getCustomerByPhone({ phone }) {
		try {
			const customer = await CustomerModel.findOne({ phone: phone })
			return customer
		} catch (error) {
			throw error
		}
	}

	//create customer

	async createCustomer({ firstName, lastName, email, password, phone, address, membership, verification, salt }) {
		try {
			const customer = await CustomerModel.create({
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone: phone,
				isVerified: verification,
				password: password,
				salt: salt,
				isLogedIn: true,
				address: address,
				memberShip: membership,
			})
			return customer
		} catch (error) {
			throw error
		}
	}

	//read customer by Id

	async getCustomerById({ customerId }) {
		try {
			const customer = await CustomerModel.findOne({ _id: customerId })
			return customer
		} catch (error) {
			throw error
		}
	}
	//get all customer

	async customers() {
		try {
			const customers = await CustomerModel.find({})
			return customers
		} catch (error) {
			throw error
		}
	}

	//delete a customer

	async deleteCustomer({ customerId }) {
		try {
			const customer = await CustomerModel.deleteOne({ _id: customerId })
			return customer
		} catch (error) {
			throw error
		}
	}

	//update information

	async updateCustomerInfo({ id, firstName, lastName, email }) {
		try {
			console.log(id)
			console.log(firstName)
			console.log(lastName)
			console.log(email)
			const customer = await CustomerModel.updateOne({ _id: id }, { first_name: firstName, last_name: lastName, email: email })
			return customer
		} catch (error) {
			throw error
		}
	}

	//change password

	async changePassword({ id, password, salt }) {
		try {
			const customer = await CustomerModel.updateOne({ _id: id }, { password: password, salt: salt })
			return customer
		} catch (error) {
			throw error
		}
	}

	//update membership

	async updateMembership({ id, memberShip }) {
		try {
			const membershipData = await CustomerModel.updateOne({ _id: id }, { memberShip: memberShip })
			return membershipData
		} catch (error) {
			throw error
		}
	}

	//update log status

	async updateLog({ customerId, isLogedIn }) {
		try {
			const logData = await CustomerModel.updateOne({ _id: id }, { isLogedIn: isLogedIn })
			return logData
		} catch (error) {
			throw error
		}
	}

	//update profile pic
}
export { CustomerRepository }
