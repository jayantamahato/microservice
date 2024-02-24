import joi from 'joi'
import { FormattedData } from '../utils/formatData.util.js'

//schema

const addToCartSchema = joi.object().keys({
	itemId: joi.string().required()
})
//middleware

export const ValidatedAddToCart = async (req, res, next) => {
	const { value, error } = addToCartSchema.validate(req.body)
	if (error) {
		res.status(403).json(FormattedData(false, 0, null, error.details[0].message))
	}
	next()
}
export const ValidateRemoveFromCart = (req, res, next) => {
	const { value, error } = addToCartSchema.validate(req.body)
	if (error) {
		res.status(403).json(FormattedData(false, 0, null, error.details[0].message))
	}
	next()
}

export const ValidateIncrementQty = (req, res, next) => {
	const { value, error } = addToCartSchema.validate(req.body)
	if (error) {
		res.status(403).json(FormattedData(false, 0, null, error.details[0].message))
	}
	next()
}
export const ValidateDecrementQty = (req, res, next) => {
	const { value, error } = addToCartSchema.validate(req.body)
	if (error) {
		res.status(403).json(FormattedData(false, 0, null, error.details[0].message))
	}
	next()
}

export const DeleteWholeCart = (req, res, next) => {
	const { value, error } = addToCartSchema.validate(req.body)
	if (error) {
		res.status(403).json(FormattedData(false, 0, null, error.details[0].message))
	}
	next()
}
