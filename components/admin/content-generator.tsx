"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Download, Link, FileImage, FileText, Wand2, Search } from "lucide-react"
import Image from "next/image"

// Mock data
const mockProducts = [
  {
    id: "1",
    name: "Camisa Polo Premium",
    price: 89.9,
    categories: ["Masculino", "Camisa", "Premium"],
    image: "/placeholder.svg?height=100&width=100",
    selected: false,
  },
  {
    id: "2",
    name: "Calça Jeans Skinny",
    price: 129.9,
    categories: ["Masculino", "Calça", "Jeans"],
    image: "/placeholder.svg?height=100&width=100",
    selected: false,
  },
  {
    id: "3",
    name: "Vestido Floral Verão",
    price: 159.9,
    categories: ["Feminino", "Vestido", "Verão"],
    image: "/placeholder.svg?height=100&width=100",
    selected: false,
  },
]

export function ContentGenerator() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const allCategories = Array.from(new Set(products.flatMap((p) => p.categories)))
  const selectedProducts = products.filter((p) => p.selected)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategories =
      selectedCategories.length === 0 || selectedCategories.every((cat) => product.categories.includes(cat))
    return matchesSearch && matchesCategories
  })

  const toggleProductSelection = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)))
  }

  const selectAll = () => {
    const allSelected = filteredProducts.every((p) => p.selected)
    setProducts((prev) =>
      prev.map((p) => (filteredProducts.find((fp) => fp.id === p.id) ? { ...p, selected: !allSelected } : p)),
    )
  }

  const generateWhatsAppArts = () => {
    if (selectedProducts.length === 0) {
      alert("Selecione pelo menos um produto para gerar as artes.")
      return
    }
    // Simular geração de artes
    alert(`Gerando ${selectedProducts.length} artes para WhatsApp...`)
  }

  const generateCustomLink = () => {
    if (selectedProducts.length === 0) {
      alert("Selecione pelo menos um produto para gerar o link.")
      return
    }
    // Simular geração de link
    const customLink = `vitrinezap.com/catalogo/${Math.random().toString(36).substr(2, 8)}`
    navigator.clipboard.writeText(customLink)
    alert(`Link gerado e copiado: ${customLink}`)
  }

  const generatePDF = () => {
    if (selectedProducts.length === 0) {
      alert("Selecione pelo menos um produto para gerar o PDF.")
      return
    }
    // Simular geração de PDF
    alert(`Gerando PDF com ${selectedProducts.length} produtos...`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerador de Conteúdo</CardTitle>
          <CardDescription>Selecione produtos e gere conteúdo personalizado para suas vendas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filtros */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
                    )
                  }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Seleção de Produtos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Produtos ({filteredProducts.length})</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{selectedProducts.length} selecionados</span>
                <Button variant="outline" size="sm" onClick={selectAll}>
                  {filteredProducts.every((p) => p.selected) ? "Desmarcar Todos" : "Selecionar Todos"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`cursor-pointer transition-all ${
                    product.selected ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => toggleProductSelection(product.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={product.selected}
                        onChange={() => toggleProductSelection(product.id)}
                        className="mt-1"
                      />
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                        <p className="text-primary font-semibold text-sm">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.categories.slice(0, 2).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Ações de Geração */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gerar Conteúdo</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <FileImage className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Artes para WhatsApp</CardTitle>
                  </div>
                  <CardDescription className="text-sm">Gere imagens otimizadas para stories e status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={generateWhatsAppArts} disabled={selectedProducts.length === 0} className="w-full">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Gerar Artes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Link className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Link Personalizado</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Crie uma página exclusiva com os produtos selecionados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={generateCustomLink} disabled={selectedProducts.length === 0} className="w-full">
                    <Link className="w-4 h-4 mr-2" />
                    Gerar Link
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Catálogo PDF</CardTitle>
                  </div>
                  <CardDescription className="text-sm">Exporte um catálogo em PDF para impressão</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={generatePDF} disabled={selectedProducts.length === 0} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Gerar PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
