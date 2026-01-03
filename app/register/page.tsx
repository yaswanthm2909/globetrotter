"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Camera } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    additionalInfo: "",
    photo: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, photo: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock registration - in production, this would call an API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/login")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Card className="w-full max-w-3xl mx-auto p-8 bg-card border border-border">
        <div className="flex flex-col items-center gap-6">
          {/* Photo upload */}
          <div className="relative">
            <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <label
              htmlFor="photo-upload"
              className="relative w-32 h-32 rounded-full border-2 border-border flex items-center justify-center bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
            >
              {photoPreview ? (
                <img
                  src={photoPreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-muted-foreground" />
              )}
            </label>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="bg-background border-border"
                required
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border"
                required
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-background border-border"
                required
              />
              <Input
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>

            <Textarea
              placeholder="Additional Information ...."
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              className="bg-background border-border min-h-32"
            />

            <Button type="submit" className="w-full max-w-xs mx-auto block" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Users"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-primary hover:underline font-medium"
            >
              Login here
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
