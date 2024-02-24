import { ProductModel } from '../models/product.model.js'
const TAG = 'PRODUCT_REPOSITORY'
class ProductRepository {
	//create products

	createProduct = async ({ name, category, desc, vendor, readyTime, images, price, stock }) => {
		try {
			const product = await ProductModel.create({
				name: name,
				category: category,
				desc: desc,
				vendor: vendor,
				readyTime: readyTime,
				images: images,
				price: price,
				rating: {
					overallRating: 0.0,
					ratings: [],
				},
				stock: stock,
			})
			return product
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	// get product by ID

	getProductById = async ({ id }) => {
		try {
			const product = await ProductModel.findOne({ _id: id })
			return product
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	// delete product by ID

	deleteProductById = async ({ id }) => {
		try {
			const result = await ProductModel.deleteOne({ _id: id })
			return result
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	// get product by vendorId

	getProductByVendorId = async ({ vendorId }) => {
		try {
			const products = ProductModel.find({ vendorId: vendorId })
			return products
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	//update product's image by id

	updateProductImageById = async ({ id, images }) => {
		try {
			const result = await ProductModel.updateOne({ _id: id }, { $set: { images: images } })
			return result
		} catch (error) {
			throw error
		}
	}

	//update product's information by id

	updateProductInformation = async ({ id, name, category, desc, readyTime, price }) => {
		try {
			const result = await ProductModel.updateOne({ _id: id }, { $set: { name: name, category: category, desc: desc, readyTime: readyTime, price: price } })
			return result
		} catch (error) {
			throw error
		}
	}

	// increase stock

	increaseStock = async ({ id, newStock }) => {
		try {
			const result = await ProductModel.updateOne({ _id: id }, { $set: { stock: newStock } })
			return result
		} catch (error) {
			throw error
		}
	}

	// decreesStock

	decreaseStock = async ({ id, unit }) => {
		try {
			const result = await ProductModel.updateOne({ _id: id }, { $set: { stock: unit } })
			return result
		} catch (error) {
			throw error
		}
	}

	//get rating of an product

	getRating = async ({ id }) => {
		try {
			const product = await this.getProductById(id)
			return product.rating
		} catch (error) {
			throw error
		}
	}

	//update product rating
	updateProductRating = async ({ id, rating }) => {
		try {
			const result = await ProductModel.updateOne({ _id: id }, { $set: { rating: rating } })
			return result
		} catch (error) {
			throw error
		}
	}

	//get all products

	getAllProducts = async () => {
		try {
			const products = await ProductModel.find({})
			return products
		} catch (error) {
			throw error
		}
	}

	//get top rated product
	//get popular products
	//get less ready time products
}
export default ProductRepository
