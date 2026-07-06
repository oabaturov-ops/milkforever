import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([])
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ error: 'Настройки управляются через код' }, { status: 501 })
}
