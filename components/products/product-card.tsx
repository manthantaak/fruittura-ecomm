"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore, useWishlistStore } from "@/lib/store"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const inWishlist = isInWishlist(product.id)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, product.variants[0])
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  return (
    <motion.article
      className={cn(
        "group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {discount > 0 && <Badge className="bg-accent text-accent-foreground">-{discount}%</Badge>}
          {product.isOrganic && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Organic
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background",
            inWishlist && "text-red-500",
          )}
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
          <span className="sr-only">Add to wishlist</span>
        </Button>

        {/* Product image as link */}
        <Link href={`/product/${product.slug}`} className="block absolute inset-0">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              isHovered && "scale-110",
              !imageLoaded && "opacity-0",
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Hover overlay with quick actions */}
        <motion.div
          className="absolute inset-0 bg-foreground/5 flex items-center justify-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground pointer-events-auto"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="pointer-events-auto"
            onClick={() => (window.location.href = `/product/${product.slug}`)}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View product</span>
          </Button>
        </motion.div>
      </div>

      {/* Product info as link */}
      <Link href={`/product/${product.slug}`} className="block p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Weight options preview */}
        <p className="text-xs text-muted-foreground mt-2">{product.variants.map((v) => v.weight).join(" • ")}</p>
      </Link>
    </motion.article>
  )
}
