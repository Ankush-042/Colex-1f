"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface Session {
  id: number
  groupName: string
  subject: string
  date: string
  time: string
  duration: string
}

const sessions: Session[] = [
  {
    id: 1,
    groupName: "Calculus Masters",
    subject: "Mathematics",
    date: "May 15, 2023",
    time: "3:00 PM",
    duration: "1 hour",
  },
  {
    id: 2,
    groupName: "Quantum Explorers",
    subject: "Physics",
    date: "May 16, 2023",
    time: "4:30 PM",
    duration: "1.5 hours",
  },
  {
    id: 3,
    groupName: "Code Wizards",
    subject: "Computer Science",
    date: "May 17, 2023",
    time: "6:00 PM",
    duration: "2 hours",
  },
]

export function DashboardSessions() {
  const sessionsRef = useRef<HTMLDivElement>(null)
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
      ref={sessionsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.9 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Study Sessions</CardTitle>
          <CardDescription>Your scheduled learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
              >
                <Card className="transition-all duration-200 hover:shadow-md border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary p-3">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{session.groupName}</h3>
                          <Badge variant="outline" className="mt-1">
                            {session.subject}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" className="transition-transform hover:scale-105">
                        Join
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{session.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        {session.time} ({session.duration})
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="ghost" className="w-full justify-center group">
            <span>View All Sessions</span>
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

