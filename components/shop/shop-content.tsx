"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, Grid3X3, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/products/product-card"
import { getProducts, getCategories } from "@/lib/api"
import type { Product, Category } from "@/lib/types"
import { cn } from "@/lib/utils"

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
]

export function ShopContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [isOrganic, setIsOrganic] = useState(false)
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "newest")
  const [page, setPage] = useState(1)

  // Fetch categories
  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  // Fetch products when filters change
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getProducts({
        category: selectedCategory || undefined,
        search: searchQuery || undefined,
        minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < 5000 ? priceRange[1] : undefined,
        isOrganic: isOrganic || undefined,
        sortBy: sortBy as "price-asc" | "price-desc" | "rating" | "newest",
        page,
        limit: 12,
      })
      setProducts(result.products)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchQuery, priceRange, isOrganic, sortBy, page])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set("category", selectedCategory)
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy !== "newest") params.set("sort", sortBy)

    const newUrl = params.toString() ? `/shop?${params.toString()}` : "/shop"
    router.replace(newUrl, { scroll: false })
  }, [selectedCategory, searchQuery, sortBy, router])

  const clearFilters = () => {
    setSelectedCategory("")
    setSearchQuery("")
    setPriceRange([0, 5000])
    setIsOrganic(false)
    setSortBy("newest")
    setPage(1)
  }

  const activeFiltersCount = [
    selectedCategory,
    searchQuery,
    priceRange[0] > 0 || priceRange[1] < 5000,
    isOrganic,
  ].filter(Boolean).length

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="text-sm font-medium py-2">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  !selectedCategory ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary",
                )}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between",
                    selectedCategory === category.slug
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-secondary",
                  )}
                >
                  <span>{category.name}</span>
                  <span className="text-muted-foreground text-xs">({category.productCount})</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-sm font-medium py-2">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={0}
                max={5000}
                step={100}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Organic Filter */}
      <div className="flex items-center gap-2">
        <Checkbox id="organic" checked={isOrganic} onCheckedChange={(checked) => setIsOrganic(checked === true)} />
        <Label htmlFor="organic" className="text-sm cursor-pointer">
          Organic Only
        </Label>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 bg-card rounded-lg border border-border/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium text-foreground">Filters</h2>
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
          </div>
          <FiltersContent />
        </div>
      </aside>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* Mobile filter button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2" variant="secondary">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>

            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{products.length}</span> of{" "}
              <span className="font-medium text-foreground">{total}</span> products
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View mode toggle */}
            <div className="hidden sm:flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.slug === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 5000) && (
              <Badge variant="secondary" className="gap-1">
                ₹{priceRange[0]} - ₹{priceRange[1]}
                <button onClick={() => setPriceRange([0, 5000])}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {isOrganic && (
              <Badge variant="secondary" className="gap-1">
                Organic
                <button onClick={() => setIsOrganic(false)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
            )}
          >
            {[...Array(6)].map((_, i) => (
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
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "grid gap-6",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
              )}
            >
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
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination placeholder */}
        {total > 12 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                Page {page} of {Math.ceil(total / 12)}
              </span>
              <Button variant="outline" disabled={page >= Math.ceil(total / 12)} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
