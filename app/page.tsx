import { Header } from "@/components/header"
import { PromoBanner } from "@/components/promo-banner"
import { ProductCatalog } from "@/components/product-catalog"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <PromoBanner />
        <ProductCatalog />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
