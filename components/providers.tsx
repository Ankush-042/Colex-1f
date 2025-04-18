"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"

// Centralized provider to prevent multiple renderers issue
export function Providers({ children }: { children: React.ReactNode }) {
  // Prevent hydration mismatch by ensuring client-side only rendering
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR or before hydration, render a minimal version
  // This prevents "Detected multiple renderers" warning
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}

