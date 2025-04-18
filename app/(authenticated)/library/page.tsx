"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Download, Star, Filter, Search, Upload, Heart, Share, BookmarkPlus } from "lucide-react"

export default function DigitalLibraryPage() {
  // Define resources inside the component
  const allResources = [
    {
      id: 1,
      title: "Introduction to Calculus",
      author: "Dr. Sarah Johnson",
      cover: "/placeholder.svg?height=400&width=300&text=Calculus",
      type: "book",
      subject: "Mathematics",
      rating: 4.8,
      downloads: 1250,
    },
    {
      id: 2,
      title: "Quantum Mechanics Explained",
      author: "Prof. Michael Brown",
      cover: "/placeholder.svg?height=400&width=300&text=Quantum+Mechanics",
      type: "video",
      subject: "Physics",
      rating: 4.9,
      downloads: 980,
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      author: "Dr. Emily Chen",
      cover: "/placeholder.svg?height=400&width=300&text=Machine+Learning",
      type: "book",
      subject: "Computer Science",
      rating: 4.7,
      downloads: 1500,
    },
    {
      id: 4,
      title: "The Structure of DNA",
      author: "Dr. James Watson",
      cover: "/placeholder.svg?height=400&width=300&text=DNA+Structure",
      type: "article",
      subject: "Biology",
      rating: 4.6,
      downloads: 750,
    },
    {
      id: 5,
      title: "Linear Algebra and Its Applications",
      author: "Prof. David Miller",
      cover: "/placeholder.svg?height=400&width=300&text=Linear+Algebra",
      type: "book",
      subject: "Mathematics",
      rating: 4.5,
      downloads: 1100,
    },
    {
      id: 6,
      title: "Introduction to Algorithms",
      author: "Dr. Thomas Cormen",
      cover: "/placeholder.svg?height=400&width=300&text=Algorithms",
      type: "book",
      subject: "Computer Science",
      rating: 4.9,
      downloads: 2000,
    },
  ]
  const [activeTab, setActiveTab] = useState("all")
  const [mounted, setMounted] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  // Use useEffect to handle client-side only code
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render a simple loading state during SSR and initial hydration
  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading digital library...</p>
        </div>
      </div>
    )
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Digital Library
        </h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 gap-2">
            <Upload className="h-4 w-4" />
            Upload Resource
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
              <div className={`relative flex-1 transition-all duration-200 ${searchFocused ? "scale-[1.02]" : ""}`}>
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for books, articles, and more..."
                  className={`pl-8 pr-4 w-full transition-all duration-300 ${
                    searchFocused
                      ? "border-primary shadow-md shadow-primary/20"
                      : "border-blue-200 dark:border-blue-800"
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] border-blue-200 focus:border-primary dark:border-blue-800">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="md:w-auto border-primary/30 hover:border-primary/80 transition-colors"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="md:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto bg-background/80 backdrop-blur-sm border">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              All Resources
            </TabsTrigger>
            <TabsTrigger
              value="books"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Books
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Articles
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Video Lectures
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="all" key="all" className="mt-6">
              <ResourceGrid resources={allResources} favorites={favorites} toggleFavorite={toggleFavorite} />
            </TabsContent>
            <TabsContent value="books" key="books" className="mt-6">
              <ResourceGrid
                resources={allResources.filter((r) => r.type === "book")}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </TabsContent>
            <TabsContent value="articles" key="articles" className="mt-6">
              <ResourceGrid
                resources={allResources.filter((r) => r.type === "article")}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </TabsContent>
            <TabsContent value="videos" key="videos" className="mt-6">
              <ResourceGrid
                resources={allResources.filter((r) => r.type === "video")}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  )
}

function ResourceGrid({ resources, favorites, toggleFavorite }: {resources:any, favorites:any, toggleFavorite:any}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource, index :number) => (
        <motion.div
          key={`resource-${resource.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <ResourceCard
            {...resource}
            isFavorite={favorites.includes(resource.id)}
            toggleFavorite={() => toggleFavorite(resource.id)}
          />
        </motion.div>
      ))}
    </div>
  )
}

function ResourceCard({ id, title, author, cover, type, subject, rating, downloads, isFavorite, toggleFavorite }: {id:any, title:any, author:any, cover:any, type:any, subject:any, rating:any, downloads:any, isFavorite:any, toggleFavorite:any}) {
  const [isHovered, setIsHovered] = useState(false)

  const typeColors = {
    book: "bg-blue-500",
    video: "bg-purple-500",
    article: "bg-green-500",
  }

  return (
    <Card
      className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50"></div>
      <CardHeader className="p-0 relative">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-md">
          <img
            src={cover || "/placeholder.svg"}
            alt={title}
            className={`object-cover w-full h-full transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-white/80 text-sm">{author}</p>
          </div>
          <Badge className={`absolute top-2 right-2 ${typeColors[type] || "bg-primary"}`}>{type}</Badge>
          <motion.button
            className="absolute top-2 left-2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite()
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
          </motion.button>
        </div>
      </CardHeader>
      <CardContent className="relative pt-4">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{author}</p>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {subject}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between relative border-t border-primary/10 bg-primary/5">
        <div className="flex items-center text-sm text-muted-foreground">
          <Download className="h-4 w-4 mr-1" />
          {downloads} downloads
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary/80">
              <Share className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary/80">
              <BookmarkPlus className="h-3.5 w-3.5 mr-1" />
              Save
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
            >
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              Read Now
            </Button>
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  )
}
