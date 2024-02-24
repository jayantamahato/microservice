import { FormattedData } from '../helper/dataFormat.js'
import { CustomerService } from '../service/customer.service.js'
const service = new CustomerService()

export const Registration = async (req, res) => {
	const { firstName, lastName, email, password, phone, address } = req.body
	try {
		const customer = await service.Create({ firstName, lastName, email, password, phone, address })
		return res.status(200).json(customer)
	} catch (error) {
		return res.status(500).json(FormattedData(false, 0, {}, 'internal error'))
	}
}

export const SignIn = async (req, res) => {
	const { phone, password } = req.body
	try {
		const customer = await service.SignIn({ phone, password })
		return res.status(200).json(customer)
	} catch (error) {
		return res.status(500).json(FormattedData(false, 0, {}, 'internal error'))
	}
}

export const Profile = async (req, res) => {
	try {
		if (req.user) {
			const customer = await service.GetCustomerById({ id: req.user.id }) //checking is user exist or not
			return res.status(200).json(customer)
		} else {
			return res.status(401).json(FormattedData(false, 0, {}, 'unauthorized customer'))
		}
	} catch (error) {
		return res.status(500).json(FormattedData(false, 0, {}, 'internal error'))
	}
}

export const Update = async (req, res) => {
	try {
		const { firstName, lastName, email } = req.body

		if (req.user) {
			const customer = await service.updateCustomer({ id: req.user.id, firstName, lastName, email })
			return res.status(200).json(customer)
		} else {
			return res.status(401).json(FormattedData(false, 0, {}, 'unauthorized customer'))
		}
	} catch (error) {
		console.log(first)
		return res.status(500).json(FormattedData(false, 0, {}, 'internal error'))
	}
}

export const Logout = async (req, res) => {
	try {
		if (req.user) {
			const customer = await this.service.updateStatus(req.user.id) //checking is user exist or not

			return res.status(200).json(customer)
		} else {
			return res.status(401).json(FormattedData(false, 0, {}, 'unauthorized customer'))
		}
	} catch (error) {
		return res.status(500).json(FormattedData(false, 0, {}, 'internal error'))
	}
}
