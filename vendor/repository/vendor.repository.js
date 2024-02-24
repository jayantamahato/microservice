import { VendorModel } from '../models/vendor.model.js'

class VendorRepository {
	//create vendor
	Create = async ({ name, email, ownerName, phone, address, shopType, encPass, salt, isEnable }) => {
		try {
			const result = VendorModel.create({ email, name, address, ownerName, phone, password: encPass, shopType, salt, rating: 0.0, coverImages: [], isEnable })
			return result
		} catch (error) {
			console.log(error)
		}
	}
	//vendor by email
	VendorByEmail = async ({ email }) => {
		try {
			const result = await VendorModel.findOne({ email })
			return result
		} catch (error) {
			console.log(error)
		}
	}

	//vendor by id
	VendorByID = async ({ id }) => {
		try {
			const result = await VendorModel.findById(id)
			return result
		} catch (error) {
			console.log(error)
		}
	}

	// delete vendor
	DeleteVendor = async ({ id }) => {
		try {
			const result = VendorModel.findByIdAndDelete(id)
			return result
		} catch (error) {
			console.log(error)
		}
	}

	//update status
	UpdateStatus = async ({ id, status }) => {
		try {
			const result = await VendorModel.findByIdAndUpdate(id, { isEnable: status })
			return result
		} catch (error) {
			console.log(error)
		}
	}

	//update ownerImage

	UpdateOwnerImage = async ({ id, imageUrl }) => {
		try {
			const result = await VendorModel.findByIdAndUpdate(id, { ownerImage: imageUrl })
			return result
		} catch (error) {
			console.log(error)
		}
	}

	//update cover images

	UpdateCoverImages = async ({ id, images }) => {
		try {
			const result = await VendorModel.findByIdAndUpdate(id, { coverImages: images })
			return result
		} catch (error) {
			console.log(error)
		}
	}

	//update Vendor Information

	UpdateInformation = async ({ id, name, email, ownerName, phone, address, shopType }) => {
		try {
			await VendorModel.findByIdAndUpdate(id, { name, email, ownerName, phone, address, shopType })
		} catch (error) {
			console.log(error)
		}
	}

	//update password

	UpdatePassword = async ({ id, password, salt }) => {
		try {
			const result = await VendorModel.findByIdAndUpdate(id, { password, salt })
			return result
		} catch (error) {
			console.log(error)
		}
	}

	//all vendors

	AllVendors = async () => {
		try {
			const result = await VendorModel.find()
			return result
		} catch (error) {
			console.log(error)
		}
	}
}
export { VendorRepository }
