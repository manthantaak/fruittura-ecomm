"use client"

import { motion } from "framer-motion"
import { Truck, Shield, RotateCcw, CreditCard, Leaf, Award } from "lucide-react"

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Safe payment gateway",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    icon: CreditCard,
    title: "COD Available",
    description: "Pay on delivery",
  },
  {
    icon: Leaf,
    title: "Fresh Quality",
    description: "Guaranteed freshness",
  },
  {
    icon: Award,
    title: "Premium Grade",
    description: "Top quality products",
  },
]

export function TrustBadges() {
  return (
    <section className="py-16 bg-primary/5 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
