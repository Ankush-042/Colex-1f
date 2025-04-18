/**
 * components/navigation/sidebar-nav.tsx
 */

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BookOpen,
  Home,
  MessageCircle,
  BookCopy,
  Brain,
  Users,
  Settings,
  LogOut,
  Layers,
  Trophy,
  Target,
  FileQuestion,
  Pen,
  Award,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarNavProps {
  className?: string
}

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: MessageCircle, label: "Q&A", href: "/qa" },
  { icon: BookCopy, label: "Digital Library", href: "/library" },
  { icon: Brain, label: "AI Tutor", href: "/ai-tutor" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: Layers, label: "Discussion Boards", href: "/discussions" },
  { icon: Users, label: "Group Study", href: "/group-study" },
]

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [teamsOpen, setTeamsOpen] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Cleanup function to prevent memory leaks
    return () => {
      setMounted(false)
    }
  }, [])

  // Safe rendering - prevent "Unexpected Fiber popped" error
  if (!mounted) return null

  const teamItems = [
    { icon: Users, label: "Team Hub", href: "/teams" },
    { icon: Trophy, label: "Leaderboards", href: "/teams/leaderboards" },
    { icon: Target, label: "Challenges", href: "/teams/challenges" },
    { icon: FileQuestion, label: "Quiz Vault", href: "/teams/quiz-vault" },
    { icon: Pen, label: "Collaboration", href: "/teams/collaboration" },
    { icon: Award, label: "Achievements", href: "/teams/achievements" },
    { icon: Star, label: "Hall of Fame", href: "/teams/hall-of-fame" },
  ]

  return (
    <div
      ref={sidebarRef}
      className={cn("w-64 flex flex-col fixed inset-y-0 z-30 border-r border-border bg-card hidden md:flex", className)}
    >
      <div className="flex items-center h-16 px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Collex</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Tooltip key={`nav-${item.href}`}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.label}</span>
                      {isActive && mounted && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            })}

            {/* Team Collaboration Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <Collapsible open={teamsOpen} onOpenChange={setTeamsOpen} className="w-full">
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                      pathname.startsWith("/teams")
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center">
                      <Users className="mr-3 h-5 w-5" />
                      <span>Team Collaboration</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2020/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-4 w-4 transition-transform duration-200 ${teamsOpen ? "rotate-180 transform" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 pr-2">
                  {teamItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                      <Tooltip key={`team-${item.href}`}>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-md transition-all duration-200",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/80 hover:bg-muted hover:text-foreground",
                            )}
                          >
                            <item.icon className="mr-3 h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TooltipProvider>
        </nav>
      </ScrollArea>

      <div className="px-2 py-4 space-y-1 border-t border-border">
        <Link
          href="/settings"
          className={cn(
            "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
            pathname === "/settings"
              ? "bg-primary/10 text-primary"
              : "text-foreground/80 hover:bg-muted hover:text-foreground",
          )}
        >
          <Settings className="mr-3 h-5 w-5" />
          <span>Settings</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2.5 h-auto text-sm font-medium rounded-md text-foreground/80 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  )
}
