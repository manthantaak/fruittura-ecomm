import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Truck, Clock, MapPin, Package, ShieldCheck, RefreshCw } from "lucide-react"

export const metadata = {
  title: "Shipping Policy | Fruittura",
  description: "Learn about Fruittura shipping and delivery policies",
}

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Shipping & Delivery</h1>
            <p className="text-lg text-muted-foreground">
              We ensure your premium dry fruits and spices reach you fresh and on time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Shipping Highlights */}
            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: Truck,
                  title: "Free Shipping",
                  description: "On orders above Rs. 999",
                },
                {
                  icon: Clock,
                  title: "Fast Delivery",
                  description: "2-5 business days",
                },
                {
                  icon: ShieldCheck,
                  title: "Safe Packaging",
                  description: "Temperature-controlled",
                },
              ].map((item) => (
                <div key={item.title} className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Delivery Zones */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Delivery Zones & Timelines
              </h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold text-foreground">Zone</th>
                      <th className="text-left px-6 py-4 font-semibold text-foreground">Delivery Time</th>
                      <th className="text-left px-6 py-4 font-semibold text-foreground">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">Metro Cities</p>
                        <p className="text-sm text-muted-foreground">Delhi, Mumbai, Bangalore, Chennai, etc.</p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">2-3 business days</td>
                      <td className="px-6 py-4 text-muted-foreground">Free above Rs. 999 / Rs. 49</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">Tier 2 Cities</p>
                        <p className="text-sm text-muted-foreground">Jaipur, Lucknow, Kochi, Indore, etc.</p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">3-5 business days</td>
                      <td className="px-6 py-4 text-muted-foreground">Free above Rs. 999 / Rs. 49</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">Remote Areas</p>
                        <p className="text-sm text-muted-foreground">Hill stations, rural areas, etc.</p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">5-7 business days</td>
                      <td className="px-6 py-4 text-muted-foreground">Free above Rs. 1,499 / Rs. 99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Packaging */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                Premium Packaging
              </h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We take extra care in packaging to ensure your products arrive fresh and undamaged:
                </p>
                <ul className="space-y-3">
                  {[
                    "Food-grade, airtight packaging to maintain freshness",
                    "Temperature-resistant materials for safe transit",
                    "Eco-friendly, recyclable outer packaging",
                    "Tamper-proof seals for your safety",
                    "Careful handling labels for fragile items",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Returns */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                <RefreshCw className="h-6 w-6 text-primary" />
                Returns & Exchanges
              </h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {"Your satisfaction is our priority. If you're not happy with your purchase:"}
                </p>
                <ul className="space-y-3">
                  {[
                    "Returns accepted within 7 days of delivery",
                    "Products must be unopened in original packaging",
                    "Quality issues: We accept returns for opened products",
                    "Free return pickup for defective or damaged items",
                    "Refunds processed within 5-7 business days",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
