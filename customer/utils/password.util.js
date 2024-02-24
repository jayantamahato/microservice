import bcrypt from 'bcrypt'
const generateSalt = async () => {
	return await bcrypt.genSalt()
}
const generatePassword = async ({ password, salt }) => {
	const encData = await bcrypt.hash(password, salt)
	return encData
}

const validatePassword = async (password, savedPassword, salt) => {
	const isVerified = savedPassword === (await bcrypt.hash(password, salt))
	return isVerified
}

export { generateSalt, generatePassword, validatePassword }
