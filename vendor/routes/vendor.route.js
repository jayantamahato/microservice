import express, { json } from 'express'

import { authentication } from '../middleware/auth.js'
import multer from 'multer'
import { Create, Delete, SignIn, UpdateVendorService, VendorInfo, Vendors } from '../controller/vendor.controller.js'
// import { uploadImage } from "../../middleware/foodImage.js";

const router = express.Router()
// image upload with multer

const multerStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, './images')
	},
	filename: function (req, file, cb) {
		console.log(file)
		return cb(null, Date.now() + file.originalname)
	},
})

const uploadImage = multer({ storage: multerStorage }).array('images', 5)
//login

router.post('/signup', Create)
router.post('/sign-in', SignIn)

//admin authorization
router.use(authentication)
router.delete('/:id', Delete)
router.get('/info/:id', VendorInfo)
router.get('/all', Vendors)
router.post('/status', UpdateVendorService)
router.post('/upload', uploadImage, (req, res) => {
	res.json(
		req.files.map((file) => ({
			originalname: file.originalname,
			filename: file.filename,
		}))
	)
})

// router.patch("/profile", vendor.updateProfile);

export { router }
