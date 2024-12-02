/* eslint-disable no-unused-vars */
export const enum DateUnit {
	MILLISECOND = 1,
	SECOND = MILLISECOND * 1000,
	MINUTE = SECOND * 60,
	HOUR = MINUTE * 60,
	DAY = HOUR * 24,
	WEEK = DAY * 7,
	MONTH = DAY * 30,
	YEAR = DAY * 365
}
