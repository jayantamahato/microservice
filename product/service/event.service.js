import { ProductService } from './product.service.js'

const service = new ProductService()

export const eventHandler = async ({ message }) => {
	switch (message.event) {
		case 'GET_BY_ID':
			const { data } = await service.getProductDetails({ productId: message.id })
			return data
			break
		case 'GET_ALL':
			break
		case 'RESPONSE':
			break

		default:
			break
	}
}
