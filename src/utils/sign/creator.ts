import { engToKor } from '@/utils/hangul'
import hangul from 'hangul-js'
import sharp from 'sharp'

const inputImagePath = './static/moremi.jpeg'

function escapeHTML(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

function splitTextByLength(text: string): { line1: string; line2: string } {
	const maxLength = 6
	const textLength = text.length

	if (textLength <= 3) {
		return { line1: text, line2: '' }
	} else if (textLength <= maxLength) {
		return {
			line1: text.slice(0, Math.ceil(textLength / 2)),
			line2: text.slice(Math.ceil(textLength / 2))
		}
	} else {
		throw new Error('Text must not exceed 6 characters.')
	}
}

export const getSignBuffer = async (text: string): Promise<Buffer> => {
	if (!text) throw new Error('Text is required.')
	const metadata = await sharp(inputImagePath).metadata()
	const { width, height } = metadata

	if (!width || !height) {
		throw new Error('Failed to retrieve image dimensions.')
	}

	// 텍스트를 변환 및 이스케이프 처리
	const isKorean = /[가-힣]/.test(decodeURI(text))
	const hangulText = isKorean ? decodeURI(text) : hangul.assemble(engToKor(text))
	const escapedText = escapeHTML(hangulText)

	// 글자 길이에 따라 분리
	const { line1, line2 } = splitTextByLength(escapedText)

	// 상하 간격 설정
	const lineSpacing = 75

	// SVG로 텍스트 오버레이 생성
	const textOverlay = Buffer.from(
		`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
      @font-face {
        font-family: "Noto Sans KR";
        src: url("file:///${__dirname}/static/NotoSansKR-Bold.otf") format("opentype");
        font-weight: 900;
      }
      .noto-sans-kr {
        font-family: "Noto Sans KR", sans-serif;
        font-weight: 900;
        font-size: ${line2 ? 154 : line1.length < 3 ? 224 : 176}px;
        fill: #000000;
        text-anchor: middle;
        dominant-baseline: middle;
        font-style: bold;
      }
      </style>
      <rect width="${width}" height="${height}" fill="none" />
      <g transform="translate(${width / 2}, ${height - 110 - (line2 ? lineSpacing : line1.length < 3 ? -25 : 0)})">
        <text class="noto-sans-kr" text-anchor="middle">
          <tspan font-weight="900">${line1}</tspan>
        </text>
      </g>
      ${
				line2
					? `<g transform="translate(${width / 2}, ${height - 110 + lineSpacing})">
          <text class="noto-sans-kr" text-anchor="middle">
          <tspan font-weight="900">${line2}</tspan>
          </text>
        </g>`
					: ''
			}
    </svg>`
	)

	// Sharp로 이미지 합성
	const buffer = await sharp(inputImagePath)
		.composite([{ input: textOverlay }])
		.webp({ quality: 80 })
		.toBuffer()

	return buffer
}
