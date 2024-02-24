import express from 'express'
import { createProduct, deleteProduct, getProductById, getProductByVendorId, getProducts, updateProductInformation } from '../controller/productController.js'
import { authentication } from '../middleware/auth.js'

const router = express.Router()
router.get('/:id', getProductById)
router.get('/vendor/:id', getProductByVendorId)
router.post('/add', createProduct)
router.use(authentication)
router.get('/', getProducts)
router.post('/update', updateProductInformation)
router.delete('/:id', deleteProduct)
export default router
