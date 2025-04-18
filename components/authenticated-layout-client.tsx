"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BookOpen,
  Home,
  MessageCircle,
  BookCopy,
  Brain,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  Menu,
} from "lucide-react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: MessageCircle, label: "Q&A", href: "/qa" },
  { icon: BookCopy, label: "Digital Library", href: "/library" },
  { icon: Brain, label: "AI Tutor", href: "/ai-tutor" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: Users, label: "Discussion Boards", href: "/discussions" },
  { icon: Users, label: "Group Study", href: "/group-study" },
]

export function AuthenticatedLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-border bg-card">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Link href="/dashboard" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Collex</span>
            </Link>
          </div>
          <div className="flex-grow flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="px-2 py-4 space-y-1 border-t">
              <Link
                href="/settings"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === "/settings" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <Link
                href="/logout"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} aria-hidden="true"></div>
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-card">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <Link href="/dashboard" className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Collex</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="px-2 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="px-2 py-4 space-y-1 border-t">
              <Link
                href="/settings"
                className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  pathname === "/settings" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <Link
                href="/logout"
                className="flex items-center px-2 py-2 text-base font-medium rounded-md text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Log Out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-card border-b">
          <button type="button" className="px-4 md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full max-w-lg lg:max-w-xs ml-auto">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    id="search"
                    className="block w-full pl-10 border-gray-300 rounded-md"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <ThemeToggle />
              <Button variant="outline" size="icon" className="relative" onClick={() => setNotifications(0)}>
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold">
                    {notifications}
                  </span>
                )}
              </Button>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout" className="cursor-pointer flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

