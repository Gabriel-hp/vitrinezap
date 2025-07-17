"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Upload } from "lucide-react"
import Image from "next/image"

// Mock data
const mockProducts = [
  {
    id: "1",
    name: "Camisa Polo Premium",
    price: 89.9,
    description: "Camisa polo de alta qualidade",
    categories: ["Masculino", "Camisa", "Premium"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Calça Jeans Skinny",
    price: 129.9,
    description: "Calça jeans skinny com elastano",
    categories: ["Masculino", "Calça", "Jeans"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Vestido Floral Verão",
    price: 159.9,
    description: "Vestido floral leve para o verão",
    categories: ["Feminino", "Vestido", "Verão"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function ProductManagement() {
  const [products] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const allCategories = Array.from(new Set(products.flatMap((p) => p.categories)))

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategories =
      selectedCategories.length === 0 || selectedCategories.every((cat) => product.categories.includes(cat))
    return matchesSearch && matchesCategories
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gerenciar Produtos</CardTitle>
              <CardDescription>Adicione, edite ou remova produtos do seu catálogo</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produto</DialogTitle>
                </DialogHeader>
                <ProductForm onClose={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
            {selectedCategories.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])} className="h-6 px-2 text-xs">
                Limpar filtros
              </Button>
            )}
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Imagem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Categorias</TableHead>
                  <TableHead className="w-32">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">R$ {product.price.toFixed(2).replace(".", ",")}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.categories.slice(0, 2).map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {product.categories.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input id="name" placeholder="Ex: Camisa Polo Premium" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Preço</Label>
          <Input id="price" type="number" step="0.01" placeholder="0,00" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição Breve</Label>
        <Input id="description" placeholder="Descrição curta do produto" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullDescription">Descrição Completa</Label>
        <Textarea id="fullDescription" placeholder="Descrição detalhada do produto" rows={4} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categories">Categorias/Tags</Label>
        <Input id="categories" placeholder="Ex: Masculino, Camisa, Premium (separadas por vírgula)" />
      </div>

      <div className="space-y-2">
        <Label>Imagens do Produto</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <Button variant="outline">Selecionar Imagens</Button>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG até 5MB cada (máximo 5 imagens)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Produto</Button>
      </div>
    </form>
  )
}
