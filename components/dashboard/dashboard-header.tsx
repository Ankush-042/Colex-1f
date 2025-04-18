"use client"

import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export function DashboardHeader() {
  const headerRef = useRef<HTMLDivElement>(null)
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
      ref={headerRef}
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Ankush!</h1>
        <p className="text-muted-foreground">Here's what's happening with your learning journey today.</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9 gap-1">
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </Button>
        <Button size="sm" className="h-9 gap-1">
          <Plus className="h-4 w-4" />
          <span>New Study Session</span>
        </Button>
      </div>
    </motion.div>
  )
}

