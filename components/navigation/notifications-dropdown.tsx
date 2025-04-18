"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New question answered",
      description: "Alice Smith answered your question about calculus",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Study group invitation",
      description: "You've been invited to join 'Physics Masters' study group",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New resource available",
      description: "A new book on Machine Learning has been added to the library",
      time: "3 hours ago",
      read: false,
    },
  ])

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Cleanup function to prevent memory leaks
    return () => {
      setMounted(false)
    }
  }, [])

  // Safe calculation with null check
  const unreadCount = notifications?.filter((n) => !n.read)?.length || 0

  const markAllAsRead = () => {
    if (!notifications) return
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    if (!notifications) return
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  // Safe rendering - prevent "Unexpected Fiber popped" error
  if (!mounted) return null

  return (
    <div ref={dropdownRef}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold"
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between p-4">
            <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-auto text-xs" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[300px]">
            {notifications && notifications.length > 0 ? (
              <div className="p-2">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start p-3 cursor-default rounded-md mb-1 focus:bg-accent"
                    onSelect={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-center w-full">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary ml-2" />}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">No notifications</div>
            )}
          </ScrollArea>
          <DropdownMenuSeparator />
          <div className="p-2">
            <Button variant="outline" className="w-full">
              View all notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

