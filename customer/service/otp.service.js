// import { FormattedData, sendOTP, validatePhone } from "../helper/index.js";
import { FormattedData } from '../helper/dataFormat.js'
import { OtpRepository } from '../repository/otp.js'
import { sendOTP } from '../utils/otp.util.js'
const TAG = 'OTP_SERVICE'

class OtpService {
	constructor() {
		this.otpRepository = new OtpRepository()
	}
	//send OTP
	async sendOTP(mobileNo) {
		try {
			const OTP = parseInt(Math.random() * (9999 - 1111) + 1111)
			const otpResponse = await sendOTP(mobileNo, OTP)
			if (otpResponse) {
				await this.otpRepository.delete(mobileNo)
				await this.otpRepository.create(mobileNo, OTP)
				return FormattedData(true, 1, {}, `otp send to ${mobileNo}`)
			} else {
				return FormattedData(false, 0, {}, 'try again')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
			return FormattedData(false, 0, {}, 'we are facing some issue')
		}
	}
	//verify OTP
	async verifyOTP(mobileNo, OTP) {
		try {
			const information = await this.otpRepository.read(mobileNo, false)
			if (information.length != 0) {
				if (information[0].otp_exp > Date.now() && information[0].otp === OTP) {
					// await this.otpRepository.delete(mobileNo);
					const log = await this.otpRepository.update(mobileNo)

					return FormattedData(true, 0, 'data', 'otp verified')
				} else {
					return FormattedData(false, 0, {}, 'otp not verified try to resend')
				}
			} else {
				return FormattedData(false, 0, {}, 'no otp information found for this no')
			}
		} catch (error) {
			console.log(TAG)
			console.log(error)
		}
	}
	// checkOTP
	async checkOTP(mobileNo) {
		try {
			const data = await this.otpRepository.read(mobileNo, true)
			return data
		} catch (error) {
			console.log(TAG)
			console.log(error)
		}
	}
	async updateStatus(mobileNo) {
		try {
			return await this.otpRepository.read(mobileNo)
		} catch (error) {
			console.log(TAG)
			console.log(error)
		}
	}
}
export { OtpService }
