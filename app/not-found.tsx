import Link from "next/link"
import Image from "next/image"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-8">
              <Image
                src="/images/fruittura.jpg"
                alt="Fruittura"
                width={100}
                height={100}
                className="mx-auto opacity-30"
              />
            </div>
            <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              {
                "Oops! The page you're looking for seems to have wandered off. It might have been moved or doesn't exist."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
