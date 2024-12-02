import qertyKeymap, { IqwertyKeymap } from './qwertyKeyMap'
const dubeolsikToQwerty = Object.fromEntries(Object.entries(qertyKeymap).map(([key, value]) => [value, key]))

export const engToKor = (engText: string) => {
	return engText.split('').map((char) => (qertyKeymap as IqwertyKeymap)[char] || char)
}

export const korToEng = (korText: string) => {
	return korText.split('').map((char) => dubeolsikToQwerty[char] || char)
}
