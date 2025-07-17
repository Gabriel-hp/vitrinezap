"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"
import { ProductFilters } from "./product-filters"
import type { Product } from "@/types/product"

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camisa Polo Premium",
    price: 89.9,
    originalPrice: 129.9,
    description: "Camisa polo de alta qualidade, 100% algodão",
    fullDescription:
      "Camisa polo premium confeccionada em 100% algodão penteado. Possui corte moderno, gola estruturada e acabamento impecável.",
    images: ["/placeholder.svg?height=300&width=300"],
    categories: ["Masculino", "Camisa", "Premium"],
    isPromo: true,
    discount: 31,
    rating: 4.8,
    sold: 234,
  },
  {
    id: "2",
    name: "Calça Jeans Skinny",
    price: 129.9,
    originalPrice: 179.9,
    description: "Calça jeans skinny com elastano",
    fullDescription: "Calça jeans skinny moderna com 2% de elastano para maior conforto e mobilidade.",
    images: ["/placeholder.svg?height=300&width=300"],
    categories: ["Masculino", "Calça", "Jeans"],
    isPromo: true,
    discount: 28,
    rating: 4.6,
    sold: 156,
  },
  // Add more products...
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `${i + 3}`,
    name: `Produto ${i + 3}`,
    price: Math.floor(Math.random() * 200) + 50,
    originalPrice: Math.floor(Math.random() * 300) + 100,
    description: `Descrição do produto ${i + 3}`,
    fullDescription: `Descrição completa do produto ${i + 3}`,
    images: ["/placeholder.svg?height=300&width=300"],
    categories: ["Categoria", "Subcategoria"],
    isPromo: Math.random() > 0.5,
    discount: Math.floor(Math.random() * 50) + 10,
    rating: Math.floor(Math.random() * 2) + 4,
    sold: Math.floor(Math.random() * 500) + 10,
  })),
]

export function ProductCatalog() {
  const [products] = useState<Product[]>(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  return (
    <div className="container mx-auto px-4 py-6">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetails={() => setSelectedProduct(product)} />
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <span className="page-link">Anterior</span>
          </li>
          <li className="page-item active">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Próximo
            </a>
          </li>
        </ul>
      </nav>


    </div>
  )
}
