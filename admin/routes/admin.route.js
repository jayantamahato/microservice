import express from 'express'
import { createAdmin, deleteAdmin, getAllAdmin, signIn } from '../controller/admin.controller.js'
import { authentication } from '../middleware/auth.js'
const router = express.Router()
router.post('/create', createAdmin)
router.post('/sign-in', signIn)
router.delete('/:id', deleteAdmin)
router.use(authentication)
router.get('/', getAllAdmin)
export { router as adminRouter }
