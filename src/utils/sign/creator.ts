import { engToKor } from '@/utils/hangul'
import hangul from 'hangul-js'
import sharp from 'sharp'
// import {join} from 'node:path';
// import fs from 'node:fs';

const inputImagePath = './moremi.jpeg'
// const webFontUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap'

function escapeHTML(text: string): string {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export const getSignBuffer = async (text: string): Promise<Buffer> => {
	if (!text) throw new Error('Text is required.')
	const metadata = await sharp(inputImagePath).metadata()
	const { width, height } = metadata

	if (!width || !height) {
		throw new Error('Failed to retrieve image dimensions.')
	}

	// 텍스트를 이스케이프 처리
	const hangulText = hangul.assemble(engToKor(text))
	const escapedText = escapeHTML(hangulText)

	// SVG로 텍스트 오버레이 생성
	const textOverlay = Buffer.from(
		`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&amp;display=swap');
        .noto-sans-kr {
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 900;
          font-size: 92px;
          fill: #000000;
          text-anchor: middle;
          dominant-baseline: middle;
          transform: skewX(-1deg);
        }
      </style>
      <rect width="${width}" height="${height}" fill="none" />
      <text x="${width / 2 + 7} " y="${height - 140}" class="noto-sans-kr">
        ${escapedText}
      </text>
    </svg>`
	)

	// Sharp로 이미지 합성
	const buffer = await sharp(inputImagePath)
		.composite([{ input: textOverlay }])
		.webp({ quality: 80 })
		.blur(0.3)
		.toBuffer()

	return buffer
}
