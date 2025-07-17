export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">VitrineZap</h3>
          <p className="text-gray-400 mb-4">Seu catálogo digital inteligente</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contato
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Suporte
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-gray-400 text-sm">
            © 2024 VitrineZap. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
