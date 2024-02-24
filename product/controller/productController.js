import { FormattedData } from '../helper/dataFormat.js'
import { ProductService } from '../service/product.service.js'
const TAG = 'PRODUCT CONTROLLER'

const service = new ProductService()

export const createProduct = async (req, res) => {
	try {
		const { name, category, desc, vendorName, readyTime, price, stock } = req.body
		let vendorId = 'testing...'
		// req.user.role == 'vendor' ? (vendorId = req.user.id) : (vendorId = req.body.vendorId)

		const images = 'req.files'
		const product = await service.createProduct({ name, category, desc, vendorId, vendorName, readyTime, images, price, stock })
		res.status(201).send(product)
	} catch (error) {
		console.log(TAG, error)
		res.status(500).send(FormattedData(false, 0, {}, 'Internal Server Error'))
	}
}
export const updateProductInformation = async (req, res) => {
	try {
		const { productId, name, category, desc, readyTime, price } = req.body
		const product = await service.updateProductInformation({ productId, name, category, desc, readyTime, price })
		res.status(200).send(product)
	} catch (error) {
		console.log(TAG, error)
		res.status(500).send(FormattedData(false, 0, {}, 'Internal Server Error'))
	}
}
export const deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id
		const product = await service.deleteProduct({ productId })
		res.status(200).send(product)
	} catch (error) {
		console.log(TAG, error)
		res.status(500).send(FormattedData(false, 0, {}, 'Internal Server Error'))
	}
}

export const getProductById = async (req, res) => {
	try {
		const productId = req.params.id
		console.log(productId)
		const product = await service.getProductDetails({ productId })
		res.status(200).send(product)
	} catch (error) {
		console.log(TAG, error)
		res.status(500).send(FormattedData(false, 0, {}, 'Internal Server Error'))
	}
}

export const getProducts = async (req, res) => {
	try {
		const products = await service.getAllProducts()
		res.status(200).send(products)
	} catch (error) {
		console.log(TAG, error)
		res.status(500).send(FormattedData(false, 0, {}, 'Internal Server Error'))
	}
}

export const getProductByVendorId = async (req, res) => {
	try {
		const vendorId = req.params.id
		const products = await service.getAllProductByVendorId({ vendorId })
		res.status(200).send(products)
	} catch (error) {
		console.log(TAG, error)
		res.status(500).send(FormattedData(false, 0, {}, 'Internal Server Error'))
	}
}
