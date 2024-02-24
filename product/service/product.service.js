import { FormattedData } from '../helper/dataFormat.js'
import ProductRepository from '../repository/product.repository.js'

const TAG = 'CUSTOMER SERVICE'

class ProductService {
	constructor() {
		this.productRepository = new ProductRepository()
	}
	//create product
	createProduct = async ({ name, category, desc, vendorId, vendorName, readyTime, images, price, stock }) => {
		try {
			//upload images to cloudinary

			const product = await this.productRepository.createProduct({
				name,
				category,
				desc,
				vendor: { vendorId: vendorId, vendorName: vendorName },
				readyTime: readyTime,
				images: [],
				price,
				stock,
			})
			if (product) {
				return FormattedData(true, 1, {}, 'product created')
			} else {
				return false
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return false
		}
	}
	//update productInformation

	updateProductInformation = async ({ productId, name, category, desc, readyTime, price }) => {
		try {
			const product = await this.productRepository.updateProductInformation({ id: productId, name, category, desc, readyTime, price })
			if (product) {
				return FormattedData(true, 1, product, 'product updated')
			} else {
				return FormattedData(false, 0, {}, 'failed to update product')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(false, 0, {}, error)
		}
	}

	//update images

	updateProductImages = async (productId, imageUrls) => {
		try {
			const res = await this.productRepository.updateProductImageById(productId, imageUrls)
			return FormattedData(true, 1, {}, 'image Updated')
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(true, 0, {}, error)
		}
	}

	//delete product
	deleteProduct = async ({ productId }) => {
		try {
			const product = await this.productRepository.deleteProductById({ id: productId })
			if (product.deletedCount) {
				return FormattedData(true, product.deletedCount, product, 'product deleted')
			} else {
				return FormattedData(false, 0, null, 'failed to  deleted')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(false, 0, {}, error)
		}
	}

	//get all products
	getAllProducts = async () => {
		try {
			const products = await this.productRepository.getAllProducts()
			if (products) {
				return FormattedData(true, products.length, products, 'products fetched')
			} else {
				return FormattedData(false, 0, {}, 'failed to fetch products')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(false, 0, {}, error)
		}
	}
	//get products by vendor

	getAllProductByVendorId = async ({ vendorId }) => {
		try {
			const products = await this.productRepository.getProductByVendorId(vendorId)
			if (products) {
				return FormattedData(true, products.length, products, 'products fetched')
			} else {
				return FormattedData(false, 0, {}, 'failed to fetch products')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(false, 0, {}, error)
		}
	}
	//get product by Id
	getProductDetails = async ({ productId }) => {
		try {
			const productDetails = await this.productRepository.getProductById({ id: productId })
			if (productDetails) {
				return FormattedData(true, 0, productDetails, 'product found')
			} else {
				return FormattedData(true, 0, {}, 'product not found')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(true, 0, {}, error)
		}
	}

	//increase stock

	increaseStock = async ({ productId, newStock }) => {
		try {
			const product = await this.productRepository.increaseStock(productId, newStock)
			if (product) {
				return FormattedData(true, 1, product, 'stock increased')
			} else {
				return FormattedData(false, 0, {}, 'failed to increase stock')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(true, 0, {}, error)
		}
	}

	//decrease stock
	decreaseStock = async ({ productId, unit }) => {
		try {
			const product = await this.productRepository.decreaseStock(productId, unit)
			if (product) {
				return FormattedData(true, 1, product, 'stock decreased')
			} else {
				return FormattedData(false, 0, {}, 'failed to decrease stock')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(true, 0, {}, error)
		}
	}

	//add rating

	addProductRating = async ({ productId, inComingRating }) => {
		try {
			const productRating = await this.productRepository.getRating(id)
			let newOverAllRating = (productRating.overallRating += inComingRating.rating)
			newOverAllRating = newOverAllRating / productRating.ratings.length + 1
			productRating.ratings.push(rating)
			productRating.overallRating = newOverAllRating
			const product = await this.productRepository.updateProductRating(productId, rating)
			if (product) {
				return FormattedData(true, 1, product, 'rating added')
			} else {
				return FormattedData(false, 0, {}, 'failed to add rating')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(true, 0, {}, error)
		}
	}

	handleEvent = async (payload) => {
		console.log(payload)

		switch (payload.event) {
			case 'GET_PRODUCT_BY_ID':
				const data = await this.getProductDetails({ productId: payload.data.productId })
				console.log(data)
				// return data
				break
			case 'DELETE_CART':
				break
			default:
				break
		}
	}
}
export { ProductService }
