"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  ChevronRight,
  Leaf,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCartStore, useWishlistStore } from "@/lib/store"
import type { Product, ProductVariant } from "@/lib/types"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0])
  const [quantity, setQuantity] = useState(1)

  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const inWishlist = isInWishlist(product.id)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity)
    toast.success(`${product.name} added to cart`, {
      description: `${quantity}x ${selectedVariant.weight}`,
    })
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-primary transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20"
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {discount > 0 && <Badge className="bg-accent text-accent-foreground">-{discount}%</Badge>}
              {product.isOrganic && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Leaf className="h-3 w-3 mr-1" />
                  Organic
                </Badge>
              )}
            </div>

            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                  selectedImage === index ? "border-primary" : "border-transparent hover:border-primary/50",
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-primary font-medium uppercase tracking-wide mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">₹{selectedVariant.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
            {discount > 0 && <Badge className="bg-green-100 text-green-800">Save {discount}%</Badge>}
          </div>

          {/* Variants */}
          <div>
            <p className="text-sm font-medium mb-3">Select Size:</p>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium",
                    selectedVariant.id === variant.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  {variant.weight} - ₹{variant.price}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium mb-3">Quantity:</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.min(selectedVariant.stock, q + 1))}
                  disabled={quantity >= selectedVariant.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">{selectedVariant.stock} in stock</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={cn(inWishlist && "text-red-500 border-red-500")}
              onClick={handleWishlistToggle}
            >
              <Heart className={cn("h-5 w-5 mr-2", inWishlist && "fill-current")} />
              {inWishlist ? "In Wishlist" : "Add to Wishlist"}
            </Button>
            <Button size="icon" variant="outline" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Secure Payment</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Easy Returns</p>
            </div>
          </div>

          {/* Product meta */}
          {(product.origin || product.shelfLife) && (
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t">
              {product.origin && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Origin: {product.origin}</span>
                </div>
              )}
              {product.shelfLife && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Shelf Life: {product.shelfLife}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product tabs */}
      <Tabs defaultValue="description" className="mt-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="nutrition"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            Nutrition
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            Reviews ({product.reviewCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-6">
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="pt-6">
          {product.nutritionInfo ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-secondary/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{product.nutritionInfo.calories}</p>
                <p className="text-sm text-muted-foreground">Calories</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{product.nutritionInfo.protein}</p>
                <p className="text-sm text-muted-foreground">Protein</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{product.nutritionInfo.fat}</p>
                <p className="text-sm text-muted-foreground">Fat</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{product.nutritionInfo.carbs}</p>
                <p className="text-sm text-muted-foreground">Carbs</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{product.nutritionInfo.fiber}</p>
                <p className="text-sm text-muted-foreground">Fiber</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Nutrition information not available for this product.</p>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{product.rating}</p>
                <div className="flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground",
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{product.reviewCount} reviews</p>
              </div>
            </div>
            <p className="text-muted-foreground">Customer reviews will appear here. This is a mock display.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
