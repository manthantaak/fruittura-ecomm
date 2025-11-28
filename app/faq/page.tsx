import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "FAQs | Fruittura",
  description: "Frequently asked questions about Fruittura products and services",
}

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "We deliver within 2-5 business days across India. Metro cities usually receive orders within 2-3 days, while remote areas may take up to 7 days.",
      },
      {
        q: "Is there free shipping?",
        a: "Yes! We offer free shipping on all orders above Rs. 999. For orders below this amount, a flat shipping fee of Rs. 49 applies.",
      },
      {
        q: "Can I track my order?",
        a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also track your order from your account dashboard.",
      },
      {
        q: "Do you deliver internationally?",
        a: "Currently, we only deliver within India. We're working on expanding to international markets soon. Stay tuned!",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        q: "Are your products 100% natural?",
        a: "Yes, all our products are 100% natural with no artificial preservatives, colors, or additives. We believe in delivering pure, unadulterated quality.",
      },
      {
        q: "How should I store the products?",
        a: "Store in a cool, dry place away from direct sunlight. Once opened, keep in an airtight container. For best freshness, consume within 3 months of opening.",
      },
      {
        q: "Do you have organic options?",
        a: "Yes! We have a dedicated organic range that includes almonds, cashews, raisins, and various spices. Look for the 'Organic' badge on product pages.",
      },
      {
        q: "What is the shelf life of your products?",
        a: "Our products have a shelf life of 6-12 months from the date of packaging. Best before date is mentioned on every package.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery if the product is unopened and in original packaging. For quality issues, we accept returns even for opened packages.",
      },
      {
        q: "How do I initiate a return?",
        a: "You can initiate a return from your order history in your account, or contact our support team. We'll arrange a pickup within 2-3 business days.",
      },
      {
        q: "When will I get my refund?",
        a: "Refunds are processed within 5-7 business days after we receive and inspect the returned product. Amount is credited to the original payment method.",
      },
    ],
  },
  {
    category: "Payments & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, net banking, and popular wallets. Cash on Delivery is also available for orders up to Rs. 5,000.",
      },
      {
        q: "Is my payment information secure?",
        a: "We use industry-standard SSL encryption and process payments through Razorpay, a PCI-DSS compliant payment gateway. Your data is always protected.",
      },
      {
        q: "Can I pay using EMI?",
        a: "Yes, EMI options are available on orders above Rs. 3,000 for select credit cards. You'll see available options at checkout.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our products, orders, and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${section.category}-${index}`}
                      className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/30"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-16 text-center p-8 bg-primary/5 rounded-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              {"Can't find the answer you're looking for? Our support team is here to help."}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
