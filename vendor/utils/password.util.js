import bcrypt from 'bcrypt'
const generateSalt = async () => {
	return await bcrypt.genSalt()
}
const generatePassword = async ({ password, salt }) => {
	return await bcrypt.hash(password, salt)
}

const validatePassword = async (password, savedPassword, salt) => {
	return savedPassword === (await bcrypt.hash(password, salt))
}

export { generateSalt, generatePassword, validatePassword }
