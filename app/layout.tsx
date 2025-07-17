import type React from "react"
import type { Metadata } from "next"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./globals.css"
import { CartProvider } from "@/hooks/use-cart"
import BootstrapClient from "@/components/bootstrap-client"

export const metadata: Metadata = {
  title: "VitrineZap - Catálogo Digital",
  description: "Seu catálogo digital inteligente com integração WhatsApp",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
          <BootstrapClient />
        </CartProvider>
      </body>
    </html>
  )
}
