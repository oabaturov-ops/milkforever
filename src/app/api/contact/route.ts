import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, message } = await request.json()
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!token || !chatId) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    }
    const text = 'New message from agrodir.ru:\n' + 'Name: ' + (name || '-') + '\n' + 'Phone: ' + (phone || '-') + '\n' + 'Email: ' + (email || '-') + '\n' + 'Message: ' + (message || '-')
    const res = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
