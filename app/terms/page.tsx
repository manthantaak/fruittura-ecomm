import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Terms of Service | Fruittura",
  description: "Terms and conditions for using Fruittura services",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: November 2024</p>

            <div className="prose prose-stone max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the Fruittura website and services, you accept and agree to be bound by these
                  Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Products and Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Fruittura offers premium dry fruits, nuts, and spices for purchase through our online platform. All
                  products are subject to availability.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Product images are representative and actual products may vary slightly</li>
                  <li>Prices are subject to change without prior notice</li>
                  <li>We reserve the right to limit quantities on any order</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Orders and Payment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By placing an order, you agree to provide accurate billing and shipping information. We reserve the
                  right to cancel orders if we suspect fraud or unauthorized transactions. Payment must be made at the
                  time of order unless Cash on Delivery is selected.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Shipping and Delivery</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We aim to deliver within the estimated timeframe but cannot guarantee exact delivery dates. Shipping
                  charges and delivery times vary based on location. You are responsible for providing accurate delivery
                  information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Returns and Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Returns are accepted within 7 days of delivery for unopened products in original packaging. For
                  quality issues, we accept returns for opened products. Refunds are processed within 5-7 business days
                  after inspection.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials. You agree to
                  notify us immediately of any unauthorized use of your account. We reserve the right to suspend or
                  terminate accounts that violate our terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos, and images, is the property of Fruittura
                  and is protected by intellectual property laws. You may not use, reproduce, or distribute any content
                  without our written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fruittura shall not be liable for any indirect, incidental, or consequential damages arising from the
                  use of our products or services. Our liability is limited to the purchase price of the products.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:legal@fruittura.com" className="text-primary hover:underline">
                    legal@fruittura.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
