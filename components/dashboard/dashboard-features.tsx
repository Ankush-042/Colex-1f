"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, BookCopy, Brain, MessageCircle, Users, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const features = [
  {
    title: "Digital Library",
    description: "Access thousands of books, articles, and resources",
    icon: BookCopy,
    href: "/library",
    color: "bg-blue-500",
  },
  {
    title: "AI Tutor",
    description: "Get personalized help with your studies",
    icon: Brain,
    href: "/ai-tutor",
    color: "bg-purple-500",
  },
  {
    title: "Q&A Platform",
    description: "Ask questions and get answers from peers",
    icon: MessageCircle,
    href: "/qa",
    color: "bg-green-500",
  },
  {
    title: "Group Study",
    description: "Join study groups and collaborate with others",
    icon: Users,
    href: "/group-study",
    color: "bg-orange-500",
  },
  {
    title: "Discussion Boards",
    description: "Participate in academic discussions",
    icon: Layers,
    href: "/discussions",
    color: "bg-red-500",
  },
  {
    title: "Chat",
    description: "Connect with peers in real-time",
    icon: MessageCircle,
    href: "/chat",
    color: "bg-indigo-500",
  },
]

export function DashboardFeatures() {
  const featuresRef = useRef<HTMLDivElement>(null)
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
    <div ref={featuresRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={feature.href} className="block h-full">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`${feature.color} text-white p-2 rounded-lg`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between group">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

