import bcrypt from 'bcrypt'
const generateSalt = async () => {
	return await bcrypt.genSalt()
}
const generatePassword = async (password, salt) => {
	return await bcrypt.hash(password, salt)
}

const validatePassword = async ({ password, savedPassword, salt }) => {
	const isVerified = savedPassword === (await bcrypt.hash(password, salt))
	return isVerified
}

export { generateSalt, generatePassword, validatePassword }
