"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, Search, X } from "lucide-react"
import { useState } from "react"

interface ProductFiltersProps {
  sortBy: string
  setSortBy: (value: string) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  totalProducts: number
}

const categories = [
  "Masculino",
  "Feminino",
  "Infantil",
  "Calçados",
  "Acessórios",
  "Eletrônicos",
  "Casa",
  "Esporte",
  "Beleza",
  "Livros",
]

export function ProductFilters({
  sortBy,
  setSortBy,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  totalProducts,
}: ProductFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSearchTerm("")
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-orange-200 focus:border-orange-500"
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 border-orange-200">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Mais Populares</SelectItem>
              <SelectItem value="price-low">Menor Preço</SelectItem>
              <SelectItem value="price-high">Maior Preço</SelectItem>
              <SelectItem value="rating">Melhor Avaliação</SelectItem>
              <SelectItem value="newest">Mais Recentes</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-orange-200 hover:bg-orange-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{totalProducts} produtos encontrados</p>
        {(selectedCategories.length > 0 || searchTerm) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-orange-500 hover:text-orange-600">
            <X className="h-4 w-4 mr-1" />
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {category}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* Expandable Filters */}
      {showFilters && (
        <Card className="border-orange-200">
          <CardContent className="p-4 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedCategories.includes(category)
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "border-orange-200 hover:bg-orange-50"
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Faixa de Preço</h3>
              <div className="space-y-3">
                <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
