"use client"

import { useState } from "react"
import Image from "next/image"
import { NavHeader } from "@/components/nav-header"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useApp } from "@/lib/context/app-context"

export default function CommunityPage() {
  const { posts, likePost } = useApp()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tripTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Community Tab</h1>
            <p className="text-muted-foreground">
              Community section where all the users can share their experience about a certain trip or activity.
            </p>
          </div>

          <div className="mb-8">
            <SearchBar placeholder="Search posts, users, or trips..." onSearch={setSearchQuery} showFilters={true} />
            <p className="mt-2 text-sm text-muted-foreground">
              Using the search, group by or filter and sort by option, the user can narrow down the result that he is
              looking for...
            </p>
          </div>

          <div className="space-y-6">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery ? "No posts match your search" : "No community posts yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Post Header */}
                    <div className="flex items-center gap-3 border-b border-border p-4">
                      <Avatar>
                        <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.userName} />
                        <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{post.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.tripTitle} • {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <p className="text-pretty leading-relaxed">{post.content}</p>
                    </div>

                    {/* Post Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="px-4 pb-4">
                        <div className={`grid gap-2 ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                          {post.images.map((image, index) => (
                            <div
                              key={index}
                              className={`relative overflow-hidden rounded-lg ${post.images.length === 1 ? "aspect-video" : "aspect-square"}`}
                            >
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Post image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center gap-4 border-t border-border p-4">
                      <Button variant="ghost" size="sm" className="gap-2" onClick={() => likePost(post.id)}>
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
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
