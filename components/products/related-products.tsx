"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  products: Product[]
  currentProductId: string
}

export function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const filteredProducts = products.filter((p) => p.id !== currentProductId).slice(0, 4)

  if (filteredProducts.length === 0) return null

  return (
    <section className="container mx-auto px-4 mt-20">
      <h2 className="font-serif text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
