import { ContactContent } from "@/components/contact/contact-content"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Contact Us | Fruittura",
  description: "Get in touch with Fruittura for any queries or support",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactContent />
      <Footer />
    </>
  )
}
