"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface Activity {
  avatar: string
  name: string
  action: string
  subject: string
  time: string
}

const activities: Activity[] = [
  {
    avatar: "/placeholder.svg?height=40&width=40",
    name: "You",
    action: "asked a question",
    subject: "Mathematics",
    time: "2 hours ago",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    name: "Alice Smith",
    action: "answered your question",
    subject: "Physics",
    time: "4 hours ago",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    name: "You",
    action: "joined a study group",
    subject: "Computer Science",
    time: "Yesterday",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
    name: "Michael Brown",
    action: "shared a resource",
    subject: "Biology",
    time: "2 days ago",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=EJ",
    name: "Emma Johnson",
    action: "commented on your answer",
    subject: "Mathematics",
    time: "3 days ago",
  },
]

export function DashboardCharts() {
  const chartsRef = useRef<HTMLDivElement>(null)
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
    <div ref={chartsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <motion.div
        className="lg:col-span-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your learning activity for the past week</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md bg-muted/30 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-10 w-10 text-primary" />
                <p>Interactive activity chart would render here</p>
                <p className="text-xs">With hover effects and tooltips</p>
                <div className="grid grid-cols-7 w-full gap-2 mt-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const heights = [60, 80, 40, 90, 70, 50, 30]
                    return (
                      <div key={`chart-${day}`} className="flex flex-col items-center">
                        <div className="bg-primary/80 rounded-t-md w-full" style={{ height: `${heights[i]}px` }}></div>
                        <span className="text-xs mt-1">{day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {activities.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                    className="flex items-center space-x-4 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>
                        {item.name
                          ? item.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        <span className={item.name === "You" ? "text-primary font-semibold" : ""}>{item.name}</span>{" "}
                        {item.action}
                      </p>
                      <p className="text-sm text-muted-foreground">in {item.subject}</p>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">{item.time}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

