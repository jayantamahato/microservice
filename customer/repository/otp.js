import { OtpModel } from '../models/otp.js'
class OtpRepository {
	async create(no, OTP) {
		await OtpModel.create({
			mobile: no,
			otp: OTP,
			otp_exp: Date.now() + 180000,
			verified: false,
		})
	}
	async update(no) {
		try {
			const otpInfo = await OtpModel.findOne({ mobile: no })
			if (otpInfo != null) {
				otpInfo.verified = true
				await otpInfo.save()
				return true
			} else {
				return false
			}
		} catch (error) {
			console.log(error.message)
			return false
		}
	}
	async read(no, isVerified) {
		return await OtpModel.find({ verified: isVerified, mobile: no })
	}
	async delete(no) {
		await OtpModel.deleteOne({ mobile: no })
	}
}
export { OtpRepository }
