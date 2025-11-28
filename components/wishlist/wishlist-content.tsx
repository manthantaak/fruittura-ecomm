"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { useWishlistStore } from "@/lib/store"

export function WishlistContent() {
  const { items, clearWishlist } = useWishlistStore()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-24 w-24 mx-auto text-muted-foreground/30 mb-6" />
        <h2 className="text-2xl font-medium text-foreground mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-8">Save products you love by clicking the heart icon.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/shop">
            Start Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">{items.length} items in your wishlist</p>
        <Button variant="ghost" size="sm" onClick={clearWishlist}>
          Clear All
        </Button>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={item.product} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
