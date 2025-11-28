"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The quality of almonds and cashews from Fruittura is unmatched. Fresh, crunchy, and incredibly tasty. My family loves them!",
  },
  {
    id: 2,
    name: "Rajesh Patel",
    location: "Ahmedabad",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Best saffron I've ever used. The aroma and color are authentic Kashmiri quality. Fast delivery and excellent packaging.",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    location: "Hyderabad",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I've been ordering from Fruittura for over a year now. Consistent quality, great prices, and their organic range is fantastic.",
  },
  {
    id: 4,
    name: "Amit Kumar",
    location: "Delhi",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The Medjool dates are absolutely divine. Perfect sweetness and texture. Highly recommend for health-conscious snacking.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Fruittura for their dry fruit and spice needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>

                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
