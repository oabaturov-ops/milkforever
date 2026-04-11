import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { prompt, output, size } = await request.json()
    if (!prompt || !output) {
      return NextResponse.json({ error: 'Missing prompt or output' }, { status: 400 })
    }

    const zai = await ZAI.create()
    const response = await zai.images.generations.create({
      prompt,
      size: size || '1344x768',
    })

    const imageBase64 = response.data[0].base64
    if (!imageBase64) {
      return NextResponse.json({ error: 'No image generated' }, { status: 500 })
    }

    const buffer = Buffer.from(imageBase64, 'base64')

    // Convert file path to absolute path under /home/z/my-project/public/
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.join('/home/z/my-project/public', output)
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({ success: true, path: output })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
