"use client"

import { Suspense } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardFeatures } from "@/components/dashboard/dashboard-features"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { DashboardSessions } from "@/components/dashboard/dashboard-sessions"
import { DashboardRecommendations } from "@/components/dashboard/dashboard-recommendations"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, Trophy, Target, FileQuestion, Pen, Award } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading dashboard header</div>}>
        <DashboardHeader />
      </ErrorBoundary>

      {/* Team Collaboration Feature Highlight */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/20 via-primary/10 to-background p-1">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-black/10"></div>
        <div className="relative rounded-lg bg-background/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                New Feature
              </div>
              <h2 className="text-2xl font-bold">Team Collaboration Hub</h2>
              <p className="text-muted-foreground max-w-2xl">
                Discover our new team-based learning platform. Form teams, compete in challenges, collaborate in
                real-time, and showcase your achievements with classmates.
              </p>
            </div>
            <Link href="/teams">
              <Button size="lg" className="whitespace-nowrap group">
                <Users className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Explore Team Hub
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Quick access to team features */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-6">
            {[
              { icon: Users, label: "Team Hub", href: "/teams", color: "bg-primary/10 text-primary" },
              {
                icon: Trophy,
                label: "Leaderboards",
                href: "/teams/leaderboards",
                color: "bg-yellow-500/10 text-yellow-600",
              },
              { icon: Target, label: "Challenges", href: "/teams/challenges", color: "bg-blue-500/10 text-blue-600" },
              {
                icon: FileQuestion,
                label: "Quiz Vault",
                href: "/teams/quiz-vault",
                color: "bg-green-500/10 text-green-600",
              },
              {
                icon: Pen,
                label: "Collaboration",
                href: "/teams/collaboration",
                color: "bg-purple-500/10 text-purple-600",
              },
              { icon: Award, label: "Achievements", href: "/teams/achievements", color: "bg-red-500/10 text-red-600" },
            ].map((item, index) => (
              <Link href={item.href} key={index}>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors duration-200 group">
                  <div className={`rounded-full ${item.color} p-2 transition-transform group-hover:scale-110`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading features section</div>}>
        <Suspense fallback={<LoadingSpinner className="my-4" />}>
          <DashboardFeatures />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading stats section</div>}>
        <Suspense fallback={<LoadingSpinner className="my-4" />}>
          <DashboardStats />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading tabs section</div>}>
        <Suspense fallback={<LoadingSpinner className="my-4" />}>
          <DashboardTabs />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading charts section</div>}>
        <Suspense fallback={<LoadingSpinner className="my-4" />}>
          <DashboardCharts />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading sessions section</div>}>
        <Suspense fallback={<LoadingSpinner className="my-4" />}>
          <DashboardSessions />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading recommendations section</div>}>
        <Suspense fallback={<LoadingSpinner className="my-4" />}>
          <DashboardRecommendations />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

