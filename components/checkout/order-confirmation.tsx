"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "ORD-" + Date.now()

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Success icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </motion.div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground mb-2">Thank you for your order</p>
        <p className="text-sm text-muted-foreground mb-8">
          Order ID: <span className="font-mono font-medium text-foreground">{orderId}</span>
        </p>

        {/* Order timeline */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-xs text-muted-foreground">Confirmed</span>
              </div>
              <div className="flex-1 h-1 bg-muted mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Processing</span>
              </div>
              <div className="flex-1 h-1 bg-muted mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Shipped</span>
              </div>
              <div className="flex-1 h-1 bg-muted mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Home className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Delivered</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 text-sm text-muted-foreground mb-8">
          <p>We&apos;ve sent a confirmation email with your order details.</p>
          <p>You can track your order status in your account dashboard.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/profile/orders">
              View Order Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
