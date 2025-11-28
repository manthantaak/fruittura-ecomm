import Image from "next/image"
import Link from "next/link"
import { Leaf, Award, Truck, Users, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "About Us | Fruittura",
  description: "Learn about Fruittura's journey in bringing premium dry fruits and spices to your table",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32">
        {/* Hero Section */}
        <section className="relative py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Story</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Since 2010, Fruittura has been on a mission to bring the finest quality dry fruits and spices from
                around the world directly to your kitchen. We believe in purity, freshness, and the authentic taste of
                nature.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/premium-dry-fruits-and-nuts-arrangement.jpg"
                  alt="Premium dry fruits"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide premium quality dry fruits and spices that are sourced ethically, processed with care,
                    and delivered fresh to every home. We are committed to supporting sustainable farming practices and
                    ensuring fair trade with our farmers.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become India's most trusted brand for premium dry fruits and spices, known for uncompromising
                    quality, authentic taste, and exceptional customer experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: "100% Natural",
                  description: "No artificial preservatives or additives. Just pure, natural goodness.",
                },
                {
                  icon: Award,
                  title: "Premium Quality",
                  description: "Handpicked and quality-tested to ensure only the best reaches you.",
                },
                {
                  icon: Truck,
                  title: "Fresh Delivery",
                  description: "Packed fresh and delivered quickly to maintain optimal freshness.",
                },
                {
                  icon: Users,
                  title: "Customer First",
                  description: "Your satisfaction is our priority. We're here to serve you better.",
                },
                {
                  icon: Heart,
                  title: "Ethical Sourcing",
                  description: "Fair trade practices that support farmers and their communities.",
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  description: "Rigorous testing and quality checks at every stage of processing.",
                },
              ].map((value) => (
                <div key={value.title} className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: "14+", label: "Years of Excellence" },
                { number: "50K+", label: "Happy Customers" },
                { number: "29+", label: "Premium Products" },
                { number: "15+", label: "Countries Sourced" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Experience the Fruittura Difference</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our carefully curated collection of premium dry fruits and spices, sourced from the finest farms
              across the globe.
            </p>
            <Link href="/shop">
              <Button size="lg">Shop Now</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
