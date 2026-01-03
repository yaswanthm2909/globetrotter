"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useApp } from "@/lib/context/app-context"
import { Camera } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useApp()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(formData.username, formData.password)
      if (success) {
        router.push("/")
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card border border-border">
        <div className="flex flex-col items-center gap-6">
          {/* Photo placeholder */}
          <div className="relative w-32 h-32 rounded-full border-2 border-border flex items-center justify-center bg-muted/20">
            <Camera className="w-12 h-12 text-muted-foreground" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-background border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-background border-border"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login Button"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-primary hover:underline font-medium"
            >
              Register here
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
