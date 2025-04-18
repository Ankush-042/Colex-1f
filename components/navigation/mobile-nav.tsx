"use client"

import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Home, MessageCircle, BookCopy, Brain, Users, Settings, LogOut, Layers, Menu, X } from "lucide-react"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: MessageCircle, label: "Q&A", href: "/qa" },
  { icon: BookCopy, label: "Digital Library", href: "/library" },
  { icon: Brain, label: "AI Tutor", href: "/ai-tutor" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: Layers, label: "Discussion Boards", href: "/discussions" },
  { icon: Users, label: "Group Study", href: "/group-study" },
]

export function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Cleanup function to prevent memory leaks
    return () => {
      setMounted(false)
    }
  }, [])

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Safe rendering - prevent "Unexpected Fiber popped" error
  if (!mounted) return null

  return (
    <div ref={mobileNavRef}>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full shadow-lg border md:hidden bg-primary text-primary-foreground"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Collex</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <div className="flex-1 overflow-auto py-4">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors",
                      pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="px-2 py-4 space-y-1 border-t">
              <Link
                href="/settings"
                className={cn(
                  "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors",
                  pathname === "/settings" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-3 h-auto text-base font-medium rounded-md text-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Log Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

