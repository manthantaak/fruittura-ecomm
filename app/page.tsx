import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ProductTicker } from "@/components/home/product-ticker"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { TrustBadges } from "@/components/home/trust-badges"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <HeroSection />
        <ProductTicker />
        <CategoriesSection />
        <FeaturedProducts />
        <TrustBadges />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
