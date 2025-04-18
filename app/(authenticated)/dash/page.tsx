"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, MessageCircle, Star, TrendingUp, Users, ChevronRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
          <span>Quick Actions</span>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={MessageCircle} title="Questions Asked" value={24} trend="+5 this week" />
        <StatCard icon={TrendingUp} title="Answers Provided" value={42} trend="+12 this week" />
        <StatCard icon={Star} title="Upvotes Received" value={128} trend="+32 this week" />
        <StatCard icon={BookOpen} title="Study Hours" value={18.5} trend="+3.2 this week" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your progress across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <ProgressItem subject="Mathematics" progress={78} />
              <ProgressItem subject="Physics" progress={65} />
              <ProgressItem subject="Computer Science" progress={92} />
              <ProgressItem subject="Biology" progress={45} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <ActivityItem
                avatar="/placeholder.svg?height=40&width=40"
                name="You"
                action="asked a question"
                subject="Mathematics"
                time="2 hours ago"
              />
              <ActivityItem
                avatar="/placeholder.svg?height=40&width=40&text=AS"
                name="Alice Smith"
                action="answered your question"
                subject="Physics"
                time="4 hours ago"
              />
              <ActivityItem
                avatar="/placeholder.svg?height=40&width=40&text=JD"
                name="You"
                action="joined a study group"
                subject="Computer Science"
                time="Yesterday"
              />
              <Button className="w-full mt-4" variant="outline">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your interests and recent activity</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <RecommendationCard
                icon={Brain}
                title="Advanced Calculus Techniques"
                description="Master complex calculus problems with these advanced techniques."
              />
              <RecommendationCard
                icon={Users}
                title="Physics Study Group"
                description="Join a group of students discussing quantum mechanics."
              />
              <RecommendationCard
                icon={BookOpen}
                title="New Computer Science eBook"
                description="Explore the latest addition to our digital library on AI and Machine Learning."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, title, value, trend }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-green-500 flex items-center">
          <TrendingUp className="mr-1 h-3 w-3" />
          {trend}
        </p>
      </CardContent>
    </Card>
  )
}

function ProgressItem({ subject, progress }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{subject}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

function ActivityItem({ avatar, name, action, subject, time }) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {name} {action}
        </p>
        <p className="text-sm text-muted-foreground">in {subject}</p>
      </div>
      <div className="text-sm text-muted-foreground">{time}</div>
    </div>
  )
}

function RecommendationCard({ icon: Icon, title, description }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2">
          <Icon className="h-4 w-4 text-blue-500" />
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" variant="default">
          Explore
        </Button>
      </CardContent>
    </Card>
  )
}

