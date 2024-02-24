import twilio from 'twilio'
import { CONFIG } from '../config/config.js'

export const sendOTP = async ({ phoneNo, OTP }) => {
	const accountSid = CONFIG.TWILIO_ACCOUNT_SID
	const authToken = CONFIG.TWILIO_AUTH_TOKEN
	const client = twilio(accountSid, authToken)

	try {
		await client.messages.create({
			body: `Your Verification Code :${OTP}`,
			from: '+12565784079',
			to: `+91${no}`,
		})
		return true
	} catch (error) {
		console.log(TAG)
		console.log(error)
		return false
	}
}
