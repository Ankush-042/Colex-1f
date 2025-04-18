"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, BookOpen, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface Recommendation {
  id: number
  title: string
  description: string
  icon: React.ElementType
  badge: string
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: "Advanced Calculus Techniques",
    description: "Master complex calculus problems with these advanced techniques.",
    icon: Brain,
    badge: "Mathematics",
  },
  {
    id: 2,
    title: "Physics Study Group",
    description: "Join a group of students discussing quantum mechanics.",
    icon: Users,
    badge: "Physics",
  },
  {
    id: 3,
    title: "New Computer Science eBook",
    description: "Explore the latest addition to our digital library on AI and Machine Learning.",
    icon: BookOpen,
    badge: "Computer Science",
  },
]

export function DashboardRecommendations() {
  const recommendationsRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Cleanup function to prevent memory leaks
    return () => {
      setMounted(false)
    }
  }, [])

  // Safe rendering - prevent "Unexpected Fiber popped" error
  if (!mounted) return null

  return (
    <motion.div
      ref={recommendationsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your interests and recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
              >
                <Card className="transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary p-2">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {item.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full transition-all hover:bg-primary/90">Explore</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="ghost" className="w-full justify-center group">
            <span>View All Recommendations</span>
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

