import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WishlistContent } from "@/components/wishlist/wishlist-content"

export const metadata = {
  title: "Wishlist - Fruittura",
  description: "Your saved products",
}

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">My Wishlist</h1>
          <WishlistContent />
        </div>
      </main>
      <Footer />
    </>
  )
}
