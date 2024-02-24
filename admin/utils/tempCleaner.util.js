import path from 'path'
import fs from 'fs'

export const clearMemory = () => {
	try {
		const dirPath = path.resolve() + '/tmp/'

		let filenames = fs.readdirSync(dirPath)

		if (filenames.length > 0) {
			filenames.forEach(async (files) => {
				var filePath = dirPath + files
				await fs.unlinkSync(filePath)
			})
		}
	} catch (error) {
		console.log(error.message)
	}
}
