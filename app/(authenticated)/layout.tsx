import type React from "react"
import { SidebarNav } from "@/components/navigation/sidebar-nav"
import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedLayout>
      <div className="flex min-h-screen">
        <SidebarNav />
        <div className="flex-1 pl-0 md:pl-64 pt-16">
          <main className="container py-6 md:py-8 px-4 md:px-6">{children}</main>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

