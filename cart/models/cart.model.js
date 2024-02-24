import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema(
	{
		customerId: { type: String, required: [true, 'customer id required'] },
		items: { type: [Object] },
		cartPrice: { type: Number, required: [true, 'cart price required'], default: 0 },
		tax: { type: Number, required: [true, 'tax required'], default: 0 },
		deliveryCharges: { type: Number, required: [true, 'delivery charges required'], default: 0 },
		discount: { type: Number, default: 0 },
		payablePrice: { type: Number, required: [true, 'payable price required'], default: 0 },
	},
	{ timestamps: true }
)

const CartModel = mongoose.model('cart', cartSchema)

export { CartModel }
