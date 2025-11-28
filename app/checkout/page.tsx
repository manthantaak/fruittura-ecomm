import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutContent } from "@/components/checkout/checkout-content"

export const metadata = {
  title: "Checkout - Fruittura",
  description: "Complete your order",
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 min-h-screen bg-secondary/20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Checkout</h1>
          <CheckoutContent />
        </div>
      </main>
      <Footer />
    </>
  )
}
