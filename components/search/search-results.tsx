"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { getProducts } from "@/lib/api"
import type { Product } from "@/lib/types"

export function SearchResults() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setSearched(true)
    try {
      const result = await getProducts({ search: searchQuery })
      setProducts(result.products)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="container mx-auto px-4">
      {/* Search form */}
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-3xl font-bold text-foreground text-center mb-6">Search Products</h1>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for dry fruits, nuts, spices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Search
          </Button>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
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
      ) : searched ? (
        products.length > 0 ? (
          <div>
            <p className="text-muted-foreground mb-6">
              Found {products.length} results for &ldquo;{initialQuery || query}&rdquo;
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-medium text-foreground mb-2">No results found</h2>
            <p className="text-muted-foreground">
              We couldn&apos;t find any products matching &ldquo;{initialQuery || query}&rdquo;
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-medium text-foreground mb-2">Start searching</h2>
          <p className="text-muted-foreground">Enter a search term to find products</p>
        </div>
      )}
    </div>
  )
}
