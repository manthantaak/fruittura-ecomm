import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchResults } from "@/components/search/search-results"

export const metadata = {
  title: "Search - Fruittura",
  description: "Search our collection of premium dry fruits and spices",
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 min-h-screen">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="h-8 bg-secondary/50 rounded w-48 mb-8 animate-pulse" />
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
    </div>
  )
}
