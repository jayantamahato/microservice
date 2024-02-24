import express from 'express'
import { createAdmin, deleteAdmin, getAllAdmin, signIn, updateStatus } from '../controller/admin.controller.js'
import { authentication } from '../middleware/auth.js'
const router = express.Router()
router.post('/create', createAdmin)
router.post('/sign-in', signIn)
router.delete('/:id', deleteAdmin)
router.use(authentication)
router.get('/', getAllAdmin)
router.get('activate/:email', updateStatus)
export { router as adminRouter }
