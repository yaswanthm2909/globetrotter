"use client"

import { useSearchParams } from "next/navigation"
import { NavHeader } from "@/components/nav-header"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/lib/context/app-context"
import { useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const regionParam = searchParams.get("region")
  const { regions } = useApp()

  const [searchQuery, setSearchQuery] = useState(regionParam || "")

  const filteredResults = regions.filter(
    (region) =>
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold">Search Pages / City Search Page</h1>

          <div className="mb-8">
            <SearchBar placeholder="Search destinations..." onSearch={setSearchQuery} showFilters={true} />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Results</h2>
          </div>

          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                </CardContent>
              </Card>
            ) : (
              filteredResults.map((result) => (
                <Card key={result.id} className="overflow-hidden transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{result.name}</h3>
                        <p className="mt-2 text-muted-foreground">{result.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
