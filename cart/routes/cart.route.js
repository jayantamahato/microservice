import express from 'express'
import { add, decrementQty, deleteItem, deleteWholeCart, getCart, incrementQty } from '../controller/cart.controller.js'
import { authentication } from '../middleware/auth.js'
import { ValidatedAddToCart, ValidateDecrementQty, ValidateIncrementQty, ValidateRemoveFromCart } from '../middleware/requestHandler.js'
const router = express.Router()
router.post('/add', ValidatedAddToCart, add)
// router.use(authentication)
router.get('/', getCart)
router.delete('/:id', deleteWholeCart)
router.post('/remove', ValidateRemoveFromCart, deleteItem)
router.post('/inc', ValidateIncrementQty, incrementQty)
router.post('/dec', ValidateDecrementQty, decrementQty)

export { router as CartRouter }
