import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Бека Лох — Premium barbershop",
  description: "Онлайн-запись в премиальный барбершоп Бека Лох, Алматы.",
  openGraph: { title: "Бека Лох — Premium barbershop", description: "Твой стиль. Наше ремесло.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Бека Лох — Premium barbershop", description: "Твой стиль. Наше ремесло." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
