"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getFeaturedProducts } from "@/lib/api"
import type { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export function ProductTicker() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getFeaturedProducts().then(setProducts)
  }, [])

  if (products.length === 0) return null

  // Duplicate for infinite scroll effect
  const duplicatedProducts = [...products, ...products]

  return (
    <section className="py-8 bg-secondary/30 overflow-hidden border-y border-border/50">
      <div className="relative">
        <motion.div className="flex gap-8 animate-ticker" style={{ width: "max-content" }}>
          {duplicatedProducts.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/product/${product.slug}`}
              className="flex items-center gap-4 bg-card px-6 py-3 rounded-full border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary">
                <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">From ₹{product.price}</p>
              </div>
              {product.originalPrice && <Badge className="bg-accent text-accent-foreground">Sale</Badge>}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
