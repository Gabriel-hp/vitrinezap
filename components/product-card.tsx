"use client"

import type React from "react"

import Image from "next/image"
import type { Product } from "@/types/product"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  onViewDetails: () => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useCart()
  const [isLiked, setIsLiked] = useState(false)

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation()
    const message = `Olá! Gostaria de comprar:\n1x ${product.name} - R$ ${product.price.toFixed(2).replace(".", ",")}`
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })
  }

  return (
    <div className="card product-card h-100" onClick={onViewDetails} style={{ cursor: "pointer" }}>
      <div className="position-relative">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="card-img-top"
          style={{ aspectRatio: "1/1", objectFit: "cover" }}
        />

        {/* Discount Badge */}
        {product.isPromo && product.discount && <span className="discount-badge">-{product.discount}%</span>}

        {/* Like Button */}
        <button
          className="btn btn-light btn-sm position-absolute top-0 end-0 m-2"
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
        >
          <i className={`bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
        </button>
      </div>

      <div className="card-body p-3">
        <h6 className="card-title text-truncate" style={{ fontSize: "0.9rem" }}>
          {product.name}
        </h6>

        <div className="mb-2">
          <span className="text-primary fw-bold">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <small className="text-muted text-decoration-line-through ms-2">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </small>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          {product.rating && (
            <div className="rating-stars">
              <i className="bi bi-star-fill"></i>
              <small className="ms-1">{product.rating}</small>
            </div>
          )}
          {product.sold && <small className="text-muted">{product.sold} vendidos</small>}
        </div>

        <button className="btn btn-primary btn-sm w-100" onClick={handleBuyNow}>
          Comprar Agora
        </button>
      </div>
    </div>
  )
}
