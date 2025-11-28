import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShopContent } from "@/components/shop/shop-content"

export const metadata = {
  title: "Shop - Fruittura | Fresh Dry Fruit & Spices",
  description: "Browse our premium collection of dry fruits, nuts, and spices. Filter by category, price, and more.",
}

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Shop All Products</h1>
            <p className="text-muted-foreground">
              Discover our premium collection of dry fruits, nuts, and aromatic spices
            </p>
          </div>
          <Suspense fallback={<ShopSkeleton />}>
            <ShopContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}

function ShopSkeleton() {
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-secondary/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg overflow-hidden border border-border/50 animate-pulse">
              <div className="aspect-square bg-secondary/50" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-secondary/50 rounded w-1/3" />
                <div className="h-4 bg-secondary/50 rounded w-3/4" />
                <div className="h-5 bg-secondary/50 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
