"use client"

import { useState, useEffect } from "react"

const banners = [
  {
    id: 1,
    title: "MEGA PROMOÇÃO",
    subtitle: "Até 70% OFF em produtos selecionados",
    gradient: "gradient-orange",
    cta: "Comprar Agora",
  },
  {
    id: 2,
    title: "FRETE GRÁTIS",
    subtitle: "Em compras acima de R$ 99",
    gradient: "gradient-success",
    cta: "Aproveitar",
  },
  {
    id: 3,
    title: "NOVIDADES",
    subtitle: "Confira os lançamentos da semana",
    gradient: "gradient-warning",
    cta: "Ver Produtos",
  },
]

export function PromoBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container my-4">
      {/* Main Banner */}
      <div id="bannerCarousel" className="carousel slide banner-carousel mb-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div key={banner.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className={`${banner.gradient} text-white p-5 rounded`} style={{ height: "200px" }}>
                <div className="d-flex align-items-center justify-content-between h-100">
                  <div>
                    <h2 className="display-6 fw-bold mb-2">{banner.title}</h2>
                    <p className="fs-5 mb-3">{banner.subtitle}</p>
                    <button className="btn btn-light btn-lg fw-semibold">{banner.cta}</button>
                  </div>
                  <div className="d-none d-md-block">
                    <i className="bi bi-gift display-1 opacity-25"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="row g-3 mb-4">
        <div className="col-4">
          <div className="gradient-orange text-white rounded p-3 text-center">
            <i className="bi bi-percent fs-3 mb-2"></i>
            <p className="mb-0 fw-semibold">Ofertas</p>
          </div>
        </div>
        <div className="col-4">
          <div className="gradient-success text-white rounded p-3 text-center">
            <i className="bi bi-gift fs-3 mb-2"></i>
            <p className="mb-0 fw-semibold">Cupons</p>
          </div>
        </div>
        <div className="col-4">
          <div className="gradient-warning text-white rounded p-3 text-center">
            <i className="bi bi-lightning-charge fs-3 mb-2"></i>
            <p className="mb-0 fw-semibold">Flash Sale</p>
          </div>
        </div>
      </div>

      {/* Featured Products Alert */}
      <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
        <i className="bi bi-fire fs-4 me-3"></i>
        <div>
          <h5 className="alert-heading mb-1">🔥 PRODUTOS EM DESTAQUE</h5>
          <p className="mb-0">Ofertas imperdíveis por tempo limitado!</p>
        </div>
        <span className="badge bg-warning text-dark ms-auto">LIMITADO</span>
      </div>
    </div>
  )
}
