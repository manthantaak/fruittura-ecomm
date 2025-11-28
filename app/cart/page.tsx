import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartContent } from "@/components/cart/cart-content"

export const metadata = {
  title: "Shopping Cart - Fruittura",
  description: "Review your cart and proceed to checkout",
}

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <CartContent />
        </div>
      </main>
      <Footer />
    </>
  )
}
