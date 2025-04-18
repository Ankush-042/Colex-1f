"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/navigation/notifications-dropdown"
import { UserDropdown } from "@/components/navigation/user-dropdown"
import { Menu, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopNavProps {
  className?: string
}

export function TopNav({ className }: TopNavProps) {
  const [mounted, setMounted] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navRef = useRef<HTMLElement>(null)

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
    <header
      ref={navRef}
      className={cn("sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6", className)}
    >
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileMenu(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex-1 md:flex md:justify-end">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border bg-background pl-8 md:w-[240px] lg:w-[320px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationsDropdown />
        <UserDropdown />
      </div>
    </header>
  )
}

