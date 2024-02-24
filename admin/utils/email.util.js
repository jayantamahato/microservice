import nodemailer from 'nodemailer'
import { CONFIG } from '../config/config'

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: CONFIG.EMAIL,
		pass: CONFIG.PASS,
	},
})

// Email data

export const sendMail = async ({ email, subject, message }) => {
	try {
		const mailOptions = {
			from: CONFIG.EMAIL,
			to: email,
			subject: subject,
			text: message,
		}

		// Send the email
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error('Error sending email:', error)
			} else {
				console.log('Email sent:', info.response)
			}
		})
	} catch (error) {
		console.log(error.message)
	}
}
