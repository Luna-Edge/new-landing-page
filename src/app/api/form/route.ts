import telegramConfig from "@/configs/telegram";
import { contactFormSchema } from "@/features/schemas/contactFormSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = contactFormSchema.parse(await request.json());

    await fetch(
      `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramConfig.chatId,
          text: `
📝 New Contact Form Submission 📝

👤 Name: ${req.name}
📧 Email: ${req.email}
💬 Message:
${req.request}
        `,
        }),
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new NextResponse(null, { status: 200 });
}
