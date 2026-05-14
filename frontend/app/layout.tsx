import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AutoParts Pro — Автозапчасти с доставкой',
  description: 'Более 50 000 наименований автозапчастей. Оригинал и аналоги. Доставка по всему Казахстану.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}
