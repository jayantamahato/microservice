import { CartModel } from '../models/cart.model.js'

class CartRepository {
	//add to cart

	async addToCart({ customerId, productInfo, amountInfo }) {
		try {
			const updateData = {
				cartPrice: amountInfo.totalPrice,
				tax: amountInfo.tax,
				deliveryCharges: amountInfo.deliveryCharges,
				discount: amountInfo.discount,
				payablePrice: amountInfo.payablePrice
			}
			const result = await CartModel.create({ customerId: customerId, items: [productInfo], ...updateData })
			return result
		} catch (error) {
			throw error
		}
	}
	//update cart
	async updateCart({ customerId, productInfo, amountInfo }) {
		try {
			const updateData = {
				cartPrice: amountInfo.totalPrice,
				tax: amountInfo.tax,
				deliveryCharges: amountInfo.deliveryCharges,
				discount: amountInfo.discount,
				payablePrice: amountInfo.payablePrice
			}
			const result = await CartModel.updateOne({ customerId: customerId }, { $addToSet: { items: productInfo }, $set: updateData }, { upsert: true })
			return result
		} catch (error) {
			throw error
		}
	}

	// remove item from cart
	async removeItemFromCart({ customerId, productId, amountInfo }) {
		try {
			const updateData = {
				cartPrice: amountInfo.totalPrice,
				tax: amountInfo.tax,
				deliveryCharges: amountInfo.deliveryCharges,
				discount: amountInfo.discount,
				payablePrice: amountInfo.payablePrice
			}

			const result = await CartModel.updateOne({ customerId: customerId }, { $pull: { items: { _id: productId } }, $set: updateData }, { upsert: false })
			return result
		} catch (error) {
			console.log(error)
			throw error
		}
	}
	//get cart by customer id
	async getCart({ customerId }) {
		try {
			const items = await CartModel.findOne({ customerId: customerId })
			return items
		} catch (error) {
			throw error
		}
	}

	//delete cart
	async deleteCart(customerId) {
		try {
			const deletedData = await CartModel.deleteOne({
				customerId: customerId
			})
			return deletedData
		} catch (error) {
			throw error
		}
	}

	// increment quantity

	async incrementQty({ customerId, productId, amountInfo }) {
		try {
			const result = await CartModel.updateOne(
				{ customerId: customerId },
				{ $inc: { [`items.$[item].quantity`]: 1 }, $set: { cartPrice: amountInfo.totalPrice, tax: amountInfo.tax, deliveryCharges: amountInfo.deliveryCharges, discount: amountInfo.discount, payablePrice: amountInfo.payablePrice } },
				{ arrayFilters: [{ 'item._id': productId }] }
			)
			return result
		} catch (error) {
			throw error
		}
	}
	async decrementQty({ customerId, productId, amountInfo }) {
		try {
			const result = await CartModel.updateOne(
				{ customerId: customerId },
				{ $inc: { [`items.$[item].quantity`]: -1 }, $set: { cartPrice: amountInfo.totalPrice, tax: amountInfo.tax, deliveryCharges: amountInfo.deliveryCharges, discount: amountInfo.discount, payablePrice: amountInfo.payablePrice } },
				{ arrayFilters: [{ 'item._id': productId }] }
			)
			return result
		} catch (error) {
			throw error
		}
	}
}
export { CartRepository }
