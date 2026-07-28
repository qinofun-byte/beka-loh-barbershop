import { NextResponse } from "next/server";

type Booking = { name?: string; phone?: string; email?: string; master?: string; service?: string; date?: string; time?: string };

export async function POST(request: Request) {
  const booking = (await request.json()) as Booking;
  if (!booking.name || !booking.phone || !booking.master || !booking.service || !booking.date || !booking.time) {
    return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.BOOKING_EMAIL;
  const from = process.env.EMAIL_FROM || "Бека Лох <onboarding@resend.dev>";
  if (!apiKey || !destination) {
    console.info("New booking", booking);
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: booking.email ? [destination, booking.email] : [destination],
      subject: `Новая запись: ${booking.name} · ${booking.time}`,
      text: `Бека Лох — подтверждение записи\n\nКлиент: ${booking.name}\nТелефон: ${booking.phone}\nМастер: ${booking.master}\nУслуга: ${booking.service}\nКогда: ${booking.date}, ${booking.time}\n\nЖдём вас в Бека Лох.`,
    }),
  });
  if (!response.ok) return NextResponse.json({ error: "Почтовый сервис недоступен" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
