import { CartRepository } from '../repository/cart.repository.js'
import { FormattedData } from '../utils/formatData.util.js'

import { CONFIG } from '../config/config.js'

import { publish } from '../utils/rpc.util.js'
import { APIError, HttpStatusCode } from '../middleware/errorHandeller.js'
const Tag = 'Cart Service'
class CartService {
	CART_QUEUE
	constructor() {
		this.cartRepository = new CartRepository()
	}

	//add to cart
	async addToCart({ customerId, itemId }) {
		try {
			const payload = {
				event: 'GET_BY_ID',
				id: itemId
			}

			const rpcResult = await publish({ queueName: CONFIG.PRODUCT_QUEUE, message: payload })

			if (!rpcResult) {
				throw new APIError(HttpStatusCode.NOT_FOUND, 'Product not found')
			}

			const productInfo = {
				_id: itemId,
				name: rpcResult.name,
				description: rpcResult.description,
				image: rpcResult.image,
				price: rpcResult.price,
				quantity: 1
			}

			const cartInfo = await this.cartRepository.getCart({ customerId })
			let cartData
			if (cartInfo) {
				//checking is user's cart exist or not
				let product = cartInfo.items.filter((item) => item._id == itemId)

				if (product.length > 0) {
					throw new APIError(HttpStatusCode.BAD_REQUEST, 'Product already added to cart')
				}
				const deliveryCharges = cartInfo.payablePrice + productInfo.price > 500 ? 0.0 : 30
				const tax = cartInfo.tax + productInfo.price * 0.18
				const totalPrice = productInfo.price + cartInfo.cartPrice + deliveryCharges + tax
				const discount = cartInfo.payablePrice + productInfo.price > 500 ? totalPrice * 0.1 : 0.0
				const payablePrice = totalPrice - discount
				const amountInfo = {
					totalPrice: totalPrice,
					tax: tax,
					deliveryCharges: deliveryCharges,
					discount: discount,
					payablePrice: payablePrice
				}

				cartData = await this.cartRepository.updateCart({ customerId, productInfo: productInfo, amountInfo: amountInfo })
			} else {
				const tax = productInfo.price * 0.18
				const deliveryCharges = productInfo.price >= 500 ? 0.0 : 30
				const totalPrice = productInfo.price + tax + deliveryCharges
				const discount = productInfo.price > 500 ? totalPrice * 0.1 : 0.0
				const payablePrice = totalPrice - discount
				const amountInfo = {
					totalPrice: totalPrice,
					tax: tax,
					deliveryCharges: deliveryCharges,
					discount: discount,
					payablePrice: payablePrice
				}
				cartData = await this.cartRepository.addToCart({ customerId, productInfo: productInfo, amountInfo: amountInfo })
			}
			return FormattedData(true, 1, cartData, 'item added to cart')
		} catch (error) {
			console.log(error)
			throw new APIError(HttpStatusCode.NOT_FOUND, `${error.message}`)
		}
	}

	//get cart
	async getCart({ customerId }) {
		try {
			const cartItem = await this.cartRepository.getCart({ customerId })
			return FormattedData(true, 1, cartItem, 'cart found')
		} catch (error) {
			throw new APIError(HttpStatusCode.NOT_FOUND, `${error.message}`)
		}
	}

	//increment item quantity
	async incrementQty({ customerId, itemId }) {
		try {
			const cartInfo = await this.cartRepository.getCart({ customerId })

			if (cartInfo) {
				const product = cartInfo.items.filter((item) => item._id == itemId)
				if (product.length == 0) {
					throw new APIError(HttpStatusCode.BAD_REQUEST, 'Product not found')
				}

				const newProductInfo = {
					_id: product[0].itemId,
					name: product[0].name,
					description: product[0].description,
					image: product[0].image,
					price: product[0].price,
					quantity: (product[0].quantity = product[0].quantity + 1)
				}
				const tax = cartInfo.tax + product[0].price * 0.18
				const deliveryCharges = cartInfo.payablePrice > 500 ? 0.0 : 30
				const totalPrice = cartInfo.cartPrice + product[0].price + tax + deliveryCharges
				const discount = cartInfo.payablePrice + newProductInfo.price > 500 ? totalPrice * 0.1 : 0.0
				const payablePrice = totalPrice - discount
				const amountInfo = {
					totalPrice: totalPrice,
					tax: tax,
					deliveryCharges: deliveryCharges,
					discount: discount,
					payablePrice: payablePrice
				}
				// const result = await this.cartRepository.updateCart({ customerId, productInfo: newProductInfo, amountInfo: amountInfo })
				const result = await this.cartRepository.incrementQty({ amountInfo: amountInfo, customerId: customerId, productId: itemId })
				return FormattedData(true, 1, result, 'item quantity incremented')
			} else {
				throw new APIError(HttpStatusCode.NOT_FOUND, 'Cart not found')
			}
		} catch (error) {
			throw new APIError(HttpStatusCode.NOT_FOUND, `${error.message}`)
		}
	}

	//decrement item quantity
	async decrementQty({ customerId, itemId }) {
		try {
			const cartInfo = await this.cartRepository.getCart({ customerId })
			if (cartInfo) {
				const product = cartInfo.items.filter((item) => item._id == itemId)
				if (product.length == 0) {
					throw new APIError(HttpStatusCode.BAD_REQUEST, 'Product not found')
				}

				const newProductInfo = {
					_id: product[0].itemId,
					name: product[0].name,
					description: product[0].description,
					image: product[0].image,
					price: product[0].price,
					quantity: (product[0].quantity = product[0].quantity + 1)
				}
				const tax = cartInfo.tax - newProductInfo.price * 0.18
				const deliveryCharges = cartInfo.payablePrice > 500 ? 0.0 : 30
				const totalPrice = cartInfo.cartPrice - newProductInfo.price - tax - deliveryCharges
				const discount = cartInfo.payablePrice - newProductInfo.price > 500 ? totalPrice * 0.1 : 0.0
				const payablePrice = totalPrice - discount
				const amountInfo = {
					totalPrice: totalPrice,
					tax: tax,
					deliveryCharges: deliveryCharges,
					discount: discount,
					payablePrice: payablePrice
				}
				const result = await this.cartRepository.decrementQty({ amountInfo: amountInfo, customerId: customerId, productId: itemId })
				return FormattedData(true, 1, result, 'item quantity decremented')
			} else {
				throw new APIError(HttpStatusCode.NOT_FOUND, 'Cart not found')
			}
		} catch (error) {
			throw new APIError(HttpStatusCode.NOT_FOUND, `${error.message}`)
		}
	}

	// delete item
	async deleteItem({ customerId, itemId }) {
		try {
			const cartInfo = await this.cartRepository.getCart({ customerId })
			if (cartInfo) {
				const product = cartInfo.items.filter((item) => item._id == itemId)
				if (product.length == 0) {
					throw new APIError(HttpStatusCode.BAD_REQUEST, 'Product not found')
				}

				const tax = cartInfo.tax - product[0].price * 0.18
				const deliveryCharges = cartInfo.cartPrice - product[0].price > 500 ? 0.0 : 30
				const totalPrice = cartInfo.cartPrice - product[0].price - product[0].price * 0.18 - deliveryCharges
				const discount = cartInfo.cartPrice - product[0].price > 500 ? totalPrice * 0.1 : 0
				const payablePrice = totalPrice - discount
				const amountInfo = {
					totalPrice: totalPrice,
					tax: tax,
					deliveryCharges: deliveryCharges,
					discount: discount,
					payablePrice: payablePrice
				}

				const result = await this.cartRepository.removeItemFromCart({ customerId, productId: itemId, amountInfo })

				if (result.nModified == 0) {
					throw new APIError(HttpStatusCode.NOT_FOUND, 'cannot delete item')
				}

				return FormattedData(true, 1, result, 'item deleted')
			} else {
				throw new APIError(HttpStatusCode.NOT_FOUND, 'cart not found')
			}
		} catch (error) {
			throw new APIError(HttpStatusCode.NOT_FOUND, `${error.message}`)
		}
	}

	//delete cart

	async deleteCart({ customerId }) {
		try {
			const result = await this.cartRepository.deleteCart({ customerId })
			if (result.nModified == 0) {
				throw new APIError(HttpStatusCode.NOT_FOUND, 'cannot delete cart')
			}
			return FormattedData(true, 1, result, 'cart deleted')
		} catch (error) {
			throw new APIError(HttpStatusCode.NOT_FOUND, `${error.message}`)
		}
	}
}
export { CartService }
