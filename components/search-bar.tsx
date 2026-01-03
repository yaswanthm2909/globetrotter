"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  showFilters?: boolean
}

export function SearchBar({ placeholder = "Search destinations...", onSearch, showFilters = true }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder={placeholder} className="pl-9" onChange={(e) => onSearch?.(e.target.value)} />
      </div>
      {showFilters && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Group by
          </Button>
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Sort by...
          </Button>
        </div>
      )}
    </div>
  )
}
