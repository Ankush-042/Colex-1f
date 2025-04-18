"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { TopNav } from "@/components/navigation/top-nav"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { ErrorBoundary } from "@/components/error-boundary"

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="h-16 border-b"></div>
        <div className="flex-1 flex">
          <div className="w-64 hidden md:block border-r"></div>
          <div className="flex-1">
            <div className="container py-6 md:py-8 px-4 md:px-6">
              <div className="h-[80vh] flex items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ErrorBoundary fallback={<div className="h-16 border-b"></div>}>
        <TopNav />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div className="md:hidden h-16 border-b"></div>}>
        <MobileNav />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Error rendering layout</div>}>{children}</ErrorBoundary>
    </div>
  )
}

