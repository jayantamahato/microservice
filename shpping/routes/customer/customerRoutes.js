import express from "express";
import { authentication } from "../../middleware/auth.js";
import { OtpController } from "../../controller/otpController.js";
import {Customer} from "../../controller/customerController.js"
const router = express.Router()
const customer = new Customer()
const OTP = new OtpController()
// -----------------------auth--------------------

//OTP

//get otp
router.post('/get-otp',OTP.getOTP)

//verify OTP
router.post('/verify-otp',OTP.verifyOTP)
//registration

router.post('/registration',customer.registration)

//neeed authentications
router.use(authentication);
//get profile
router.get('/',customer.profile)
// router.get('/logout',logOut)
//update profile
router.patch('/edit',customer.update)


// -----------------------cart--------------------

//add to cart
// router.post('/add-to-cart',addToCart);
//remove from cart
// router.delete('/remove-cart',removeCart);
//remove from cart by ID
// router.delete('/remove-cart/:id',removeFromCart);


// -----------------------orders--------------------

//place order
// router.post('/order',placeOrder)
//order list
// router.get('/orders',orderList)
//cancel orders
// router.delete('/order/:id',cancelOrder)
//re-order
// router.post('/re-order',reOrder)





export {router as customerRouter}