import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lora, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { StoreProvider } from "@/lib/store-provider"
import { Toaster } from "@/components/ui/sonner"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Fruittura - Fresh Dry Fruit & Spices",
  description:
    "Premium quality dry fruits and spices delivered fresh to your doorstep. Shop almonds, cashews, pistachios, exotic spices and more.",
  keywords: ["dry fruits", "spices", "almonds", "cashews", "organic", "premium quality"],
  openGraph: {
    title: "Fruittura - Fresh Dry Fruit & Spices",
    description: "Premium quality dry fruits and spices delivered fresh to your doorstep.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#C5A028",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
