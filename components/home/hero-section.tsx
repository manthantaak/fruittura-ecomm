"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Leaf, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Leaf, text: "100% Natural" },
  { icon: Truck, text: "Free Shipping" },
  { icon: Shield, text: "Quality Assured" },
]

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-background to-primary/10" />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6"
            >
              <Leaf className="h-4 w-4" />
              <span>Premium Quality Since 1990</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              <span className="block">Nature&apos;s Finest</span>
              <span className="block text-primary">Dry Fruits &amp; Spices</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Discover our handpicked collection of premium dry fruits and exotic spices, sourced directly from the
              world&apos;s finest farms to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                asChild
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative mt-12 lg:mt-0 flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative aspect-square w-full max-w-[320px] md:max-w-[450px] lg:max-w-[500px]">
              {/* Main product image */}
              <motion.div
                className="absolute inset-4 md:inset-8 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/premium-dry-fruits-and-nuts-arrangement-in-golden-.jpg"
                  alt="Premium dry fruits collection"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating product cards */}
              <motion.div
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-card rounded-lg shadow-lg p-2 md:p-3 border border-border max-w-[100px] md:max-w-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image src="/premium-california-almonds.jpg" alt="Almonds" fill className="rounded-md object-cover" />
                </div>
                <p className="text-[10px] md:text-xs font-medium mt-1 text-center">Almonds</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-card rounded-lg shadow-lg p-2 md:p-3 border border-border max-w-[100px] md:max-w-none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image src="/premium-cashew-nuts.jpg" alt="Cashews" fill className="rounded-md object-cover" />
                </div>
                <p className="text-[10px] md:text-xs font-medium mt-1 text-center">Cashews</p>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 md:-right-8 bg-card rounded-lg shadow-lg p-2 md:p-3 border border-border max-w-[100px] md:max-w-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image src="/kashmiri-saffron-threads.jpg" alt="Saffron" fill className="rounded-md object-cover" />
                </div>
                <p className="text-[10px] md:text-xs font-medium mt-1 text-center">Saffron</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
