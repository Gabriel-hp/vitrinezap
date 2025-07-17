"use client"

import { useCart } from "@/hooks/use-cart"

export function Header() {
  const { items, toggleCart } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky-top">
      {/* Top Bar */}
      <div className="gradient-orange text-white py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <small className="d-flex gap-3">
                <span>
                  <i className="bi bi-phone"></i> Baixe nosso app
                </span>
                <span>
                  <i className="bi bi-truck"></i> Frete grátis acima de R$ 99
                </span>
              </small>
            </div>
            <div className="col-md-4 text-end d-none d-md-block">
              <small className="d-flex gap-3 justify-content-end">
                <span>Seja um vendedor</span>
                <span>Ajuda</span>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary fs-3" href="#">
            <i className="bi bi-bag-heart-fill"></i> VitrineZap
          </a>

          <div className="d-flex align-items-center gap-3">
            {/* Search - Desktop */}
            <div className="d-none d-md-flex position-relative" style={{ width: "400px" }}>
              <input className="form-control border-primary" type="search" placeholder="Buscar produtos..." />
              <button className="btn btn-primary position-absolute end-0 top-0 h-100">
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Notifications */}
            <button className="btn btn-outline-secondary position-relative">
              <i className="bi bi-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
            </button>

            {/* Cart */}
            <button className="btn btn-outline-primary position-relative" onClick={toggleCart}>
              <i className="bi bi-cart3"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="container d-md-none mt-3">
          <div className="position-relative">
            <input className="form-control border-primary" type="search" placeholder="Buscar produtos..." />
            <button className="btn btn-primary position-absolute end-0 top-0 h-100">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
