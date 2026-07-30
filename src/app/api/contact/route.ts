import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const text = "Заявка с agrodir.ru!\n\n" +
      "Имя: " + name + "\n" +
      "Телефон: " + phone + (email ? "\nEmail: " + email : "") + "\n" +
      "Сообщение: " + (message || "нет")

    await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Telegram error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
