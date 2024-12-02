export const dateToTimeString = (date: number): string => {
	const d = new Date(date)
	const hours = d.getHours().toString().padStart(2, '0')
	const minutes = d.getMinutes().toString().padStart(2, '0')
	const seconds = d.getSeconds().toString().padStart(2, '0')
	const milliseconds = d.getMilliseconds().toString().padStart(3, '0')

	return `${hours}:${minutes}:${seconds}.${milliseconds}`
}
