import { FormattedData } from '../helper/dataFormat.js'
import { VendorService } from '../service/vendor.services.js'
const service = new VendorService()

//sign up

export const Create = async (req, res, next) => {
	try {
		const { name, email, ownerName, phone, address, shopType, password } = req.body
		const data = await service.Create({ name, email, ownerName, phone, address, shopType, password })
		return res.status(200).json(data)
	} catch (error) {
		console.log(error)
		return res.status(500).json(FormattedData(false, 0, {}, 'error occurred'))
	}
}
//sign in

export const SignIn = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const data = await service.SignIn(email, password)
		return res.status(200).json(data)
	} catch (error) {
		console.log(error)
		return res.status(500).json(FormattedData(false, 0, {}, 'error occurred'))
	}
}

//delete

export const Delete = async (req, res, next) => {
	try {
		const { id } = req.params

		const data = await service.DeleteVendor({ id })
		return res.status(200).json(data)
	} catch (error) {
		return res.status(500).json(FormattedData(false, 0, {}, 'error occurred'))
	}
}

//get vendor by id

export const VendorInfo = async (req, res, next) => {
	try {
		const data = await service.GetVendorByID({ id: req.params.id })
		return res.status(200).json(data)
	} catch (error) {
		console.log(error)
		return res.status(500).json(FormattedData(false, 0, {}, 'error occurred'))
	}
}

//all vendors

export const Vendors = async (req, res, next) => {
	try {
		const data = await service.GetAllVendors()
		return res.status(200).json(data)
	} catch (error) {
		console.log(error)
		return res.status(500).json(FormattedData(false, 0, {}, 'error occurred'))
	}
}

export const UpdateVendorService = async (req, res, next) => {
	try {
		const { email } = req.body
		const data = await service.UpdateVendorService({ email })
		return res.status(200).json(data)
	} catch (error) {
		console.log(error)
		return res.status(500).json(FormattedData(false, 0, {}, 'error occurred'))
	}
}
