import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OrderConfirmation } from "@/components/checkout/order-confirmation"

export const metadata = {
  title: "Order Confirmed - Fruittura",
  description: "Your order has been placed successfully",
}

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 min-h-screen">
        <Suspense fallback={<div className="container mx-auto px-4 text-center py-16">Loading...</div>}>
          <OrderConfirmation />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
