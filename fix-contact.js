var fs = require("fs");
var c = "import { NextRequest, NextResponse } from \"next/server\"\n" +
"\n" +
"export async function POST(request: NextRequest) {\n" +
"  try {\n" +
"    const body = await request.json()\n" +
"    const { name, phone, email, message } = body\n" +
"\n" +
"    if (!name || !phone) {\n" +
"      return NextResponse.json({ error: \"Name and phone are required\" }, { status: 400 })\n" +
"    }\n" +
"\n" +
"    const token = process.env.TELEGRAM_BOT_TOKEN\n" +
"    const chatId = process.env.TELEGRAM_CHAT_ID\n" +
"\n" +
"    if (!token || !chatId) {\n" +
"      console.error(\"Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID\")\n" +
"      return NextResponse.json({ error: \"Server configuration error\" }, { status: 500 })\n" +
"    }\n" +
"\n" +
"    const text = \"\u0417\u0430\u044f\u0432\u043a\u0430 \u0441 agrodir.ru!\\n\\n\" +\n" +
"      \"\u0418\u043c\u044f: \" + name + \"\\n\" +\n" +
"      \"\u0422\u0435\u043b\u0435\u0444\u043e\u043d: \" + phone + (email ? \"\\nEmail: \" + email : \"\") + \"\\n\" +\n" +
"      \"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435: \" + (message || \"\u043d\u0435\u0442\")\n" +
"\n" +
"    await fetch(\"https://api.telegram.org/bot\" + token + \"/sendMessage\", {\n" +
"      method: \"POST\",\n" +
"      headers: { \"Content-Type\": \"application/json\" },\n" +
"      body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: \"HTML\" })\n" +
"    })\n" +
"\n" +
"    return NextResponse.json({ success: true })\n" +
"  } catch (error) {\n" +
"    console.error(\"Telegram error:\", error)\n" +
"    return NextResponse.json({ error: \"Failed to send message\" }, { status: 500 })\n" +
"  }\n" +
"}\n";
fs.writeFileSync("C:/Users/oba12/milkforever/src/app/api/contact/route.ts", c, "utf8");
console.log("done");
