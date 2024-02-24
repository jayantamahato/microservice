import { FormattedData } from '../utils/formatData.util.js'
import { CartService } from '../service/cart.service.js'

const service = new CartService()

//get all cart
export const getCart = async (req, res) => {
	const { customerId } = req.user //checking is user exist or not
	try {
		const cartStatus = await service.getCart({ customerId }) //checking is user exist or not
		return res.status(200).json(cartStatus)
	} catch (error) {
		console.log(error)
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
//add to cart

export const add = async (req, res) => {
	const { itemId } = req.body
	// const { customerId } = req.user //checking is user exist or not
	try {
		const cartStatus = await service.addToCart({
			customerId: 100,
			itemId
		})
		return res.status(200).json(cartStatus)
	} catch (error) {
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
//increment quantity
export const incrementQty = async (req, res) => {
	const { itemId } = req.body
	// const { userId } = req.user
	try {
		const result = await service.incrementQty({ customerId: 100, itemId }) //checking is user exist or not
		return res.status(200).json(FormattedData(true, 1, result, 'incremented quantity'))
	} catch (error) {
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
// decrement quantity
export const decrementQty = async (req, res) => {
	const { itemId } = req.body
	// const { userId } = req.user
	try {
		const result = await service.decrementQty({ customerId: 100, itemId }) //checking is user exist or not

		return res.status(200).json(FormattedData(true, 1, result, 'decremented quantity'))
	} catch (error) {
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
//delete item
export const deleteItem = async (req, res) => {
	const { itemId } = req.body
	const { userId } = req.user
	try {
		const result = await service.deleteItem({ customerId: userId, itemId }) //checking is user exist or not
		return res.status(200).json(result)
	} catch (error) {
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
//delete whole cart
export const deleteWholeCart = async (req, res) => {
	try {
		const customerId = req.user.userId
		const result = await service.deleteCart({ customerId }) //checking is user exist or not
	} catch (error) {
		return res.status(error.statusCode).json(FormattedData(false, 0, null, error.message))
	}
}
