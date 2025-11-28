import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductDetail } from "@/components/products/product-detail"
import { RelatedProducts } from "@/components/products/related-products"
import { getProduct, getProducts } from "@/lib/api"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.name} - Fruittura`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const { products: relatedProducts } = await getProducts({
    category: product.categorySlug,
    limit: 4,
  })

  return (
    <>
      <Header />
      <main className="pt-32 pb-16">
        <ProductDetail product={product} />
        <RelatedProducts products={relatedProducts.filter((p) => p.id !== product.id)} currentProductId={product.id} />
      </main>
      <Footer />
    </>
  )
}
