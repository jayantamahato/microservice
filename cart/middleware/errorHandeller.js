export const HttpStatusCode = {
	OK: 200,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER: 500
}
class baseError extends Error {
	constructor(statusCode, message) {
		super(message)
		this.statusCode = statusCode
		Error.captureStackTrace(this, this.constructor)
	}
}
class APIError extends baseError {
	constructor(statusCode, message) {
		super(statusCode, message)
	}
}
export { APIError }
