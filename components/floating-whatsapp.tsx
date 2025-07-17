"use client"

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const message = "Olá! Vim através do catálogo VitrineZap. Gostaria de mais informações sobre os produtos."
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="floating-whatsapp">
      <button
        className="btn btn-success rounded-circle p-3 shadow-lg"
        onClick={handleWhatsAppClick}
        style={{ width: "60px", height: "60px" }}
      >
        <i className="bi bi-whatsapp fs-4"></i>
      </button>
    </div>
  )
}
