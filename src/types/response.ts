export enum ApiResponseType {
	'SUCCESS' = 'success',
	'ERROR' = 'error'
}

export enum ApiStatusCode {
	'SUCCESS' = 200,
	'CREATED' = 201,
	'ACCEPTED' = 202,
	'BAD_REQUEST' = 400,
	'UNAUTHORIZED' = 401,
	'FORBIDDEN' = 403,
	'NOT_FOUND' = 404,
	'METHOD_NOT_ALLOWED' = 405,
	'TOO_MANY_REQUESTS' = 429,
	'INTERNAL_SERVER_ERROR' = 500
}

export enum CustomErrorCode {
	'PAGE_NOT_FOUND' = '404',
	'METHOD_NOT_ALLOWED' = '405',
	'TOO_MANY_REQUESTS' = '429',
	'UNKNOWN_ERROR' = 'S999'
}
export type CustomErrorCodeType = `${CustomErrorCode}`
export interface ErrorDetail {
	code: ApiStatusCode
	message: string
}

const errorMessages: Record<CustomErrorCodeType, ErrorDetail> = {
	'404': {
		code: ApiStatusCode.NOT_FOUND,
		message: '요청하신 페이지를 찾을 수 없습니다'
	},
	'405': {
		code: ApiStatusCode.METHOD_NOT_ALLOWED,
		message: '요청한 메서드는 허용되지 않습니다'
	},
	'429': {
		code: ApiStatusCode.TOO_MANY_REQUESTS,
		message: '시간당 요청 횟수를 초과하였습니다'
	},
	S999: {
		code: ApiStatusCode.INTERNAL_SERVER_ERROR,
		message: '알 수 없는 오류가 발생하였습니다'
	}
}

export function CustomErrorMessage(code: CustomErrorCodeType): ErrorDetail {
	return errorMessages[code] || errorMessages['S999']
}

export interface ApiErrorResponse {
	code: string
	message: string
}

export interface ApiResponse {
	status: ApiResponseType
	data?: object
	error?: ApiErrorResponse
}
