import { authentication } from '../middleware/auth.js'
import express from 'express'
import { OTP } from '../controller/otpController.js'
import { Profile, Registration, SignIn, Update } from '../controller/customerController.js'

const router = express.Router()

const otp = new OTP()

router.get('/health', (req, res) => {
	return res.status(200).json({ message: 'Customer Health' })
})
router.post('/get-otp', otp.getOTP)
router.post('/verify-otp', otp.verifyOTP)
router.post('/signup', Registration)
router.post('/sign-in', SignIn)

router.use(authentication)
router.get('/profile', Profile)
router.patch('/update-info', Update)
// router.post('/add-address');
// router.patch('/edit-address');
// router.delete('/delete-address');
// router.get('/get-address');
// router.get('/activation');
// router.get('/logout',customer.logout);

export { router }
