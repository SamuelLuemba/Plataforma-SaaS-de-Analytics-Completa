import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './global.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Analytics SaaS | Modern Analytics Platform',
  description: 'Plataforma completa de analytics com dashboards em tempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={cn("dark", "font-sans", geist.variable)} suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}