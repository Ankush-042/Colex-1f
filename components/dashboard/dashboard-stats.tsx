"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Star, Clock, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const stats = [
  {
    title: "Questions Asked",
    value: "24",
    change: "+5",
    trend: "up",
    icon: MessageCircle,
  },
  {
    title: "Answers Provided",
    value: "42",
    change: "+12",
    trend: "up",
    icon: MessageCircle,
  },
  {
    title: "Upvotes Received",
    value: "128",
    change: "+32",
    trend: "up",
    icon: Star,
  },
  {
    title: "Study Hours",
    value: "18.5",
    change: "+3.2",
    trend: "up",
    icon: Clock,
  },
]

export function DashboardStats() {
  const statsRef = useRef<HTMLDivElement>(null)
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
    <div ref={statsRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
        >
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="bg-primary/10 p-2 rounded-full">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                <TrendingUp className={`mr-1 h-3 w-3 ${stat.trend === "down" && "rotate-180"}`} />
                <span>{stat.change} this week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

