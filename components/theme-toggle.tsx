"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)

    // Cleanup function to prevent memory leaks
    return () => {
      setMounted(false)
    }
  }, [])

  // Safe rendering - prevent "Unexpected Fiber popped" error
  if (!mounted) {
    return (
      <Button ref={buttonRef} variant="ghost" size="icon" className="h-9 w-9" aria-label="Toggle theme">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  // Safe theme handling with null check
  const currentTheme = resolvedTheme || "light"
  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-md"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentTheme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentTheme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

