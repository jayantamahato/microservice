import { v2 as cloudinary } from 'cloudinary'
import { CONFIG } from '../config/config.js'
cloudinary.config({
	cloud_name: 'dgnvq8qje',
	api_key: 343424864916482,
	api_secret: CONFIG.CLOUDINARY_API_SECRET,
	secure: true,
})

export const imageUploader = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${file}`)
		return result.secure_url
	} catch (error) {
		console.log(error)
	}
}
