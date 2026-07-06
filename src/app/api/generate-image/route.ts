import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { prompt, output, size } = await request.json()
    
    if (!prompt || !output) {
      return NextResponse.json({ error: 'prompt and output are required' }, { status: 400 })
    }

    const zai = await ZAI.create()
    const response = await zai.images.generations.create({
      prompt,
      size: size || '1344x768'
    })

    const imageBase64 = response.data[0].base64
    const buffer = Buffer.from(imageBase64, 'base64')
    
    const outputPath = path.join(process.cwd(), output)
    fs.writeFileSync(outputPath, buffer)

    return NextResponse.json({ success: true, path: outputPath, size: buffer.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
