"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  LineChart,
  MessageCircle,
  MoreHorizontal,
  PieChart,
  Plus,
  Star,
  TrendingUp,
  Users,
  BookCopy,
  Layers,
  BarChart3,
} from "lucide-react"

// Define features outside the component
const features = [
  {
    title: "Digital Library",
    description: "Access thousands of books, articles, and resources",
    icon: BookCopy,
    href: "/library",
    color: "bg-blue-500",
  },
  {
    title: "AI Tutor",
    description: "Get personalized help with your studies",
    icon: Brain,
    href: "/ai-tutor",
    color: "bg-purple-500",
  },
  {
    title: "Q&A Platform",
    description: "Ask questions and get answers from peers",
    icon: MessageCircle,
    href: "/qa",
    color: "bg-green-500",
  },
  {
    title: "Group Study",
    description: "Join study groups and collaborate with others",
    icon: Users,
    href: "/group-study",
    color: "bg-orange-500",
  },
  {
    title: "Discussion Boards",
    description: "Participate in academic discussions",
    icon: Layers,
    href: "/discussions",
    color: "bg-red-500",
  },
  {
    title: "Chat",
    description: "Connect with peers in real-time",
    icon: MessageCircle,
    href: "/chat",
    color: "bg-indigo-500",
  },
]

// Define stats outside the component
const stats = [
  {
    title: "Questions Asked",
    value: "24",
    change: "+5",
    trend: "up",
    icon: MessageCircle,
  },
  {
    title: "Answers Provided",
    value: "42",
    change: "+12",
    trend: "up",
    icon: MessageCircle,
  },
  {
    title: "Upvotes Received",
    value: "128",
    change: "+32",
    trend: "up",
    icon: Star,
  },
  {
    title: "Study Hours",
    value: "18.5",
    change: "+3.2",
    trend: "up",
    icon: Clock,
  },
]

// Define activities outside the component
const activities = [
  {
    avatar: "/placeholder.svg?height=40&width=40",
    name: "You",
    action: "asked a question",
    subject: "Mathematics",
    time: "2 hours ago",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    name: "Alice Smith",
    action: "answered your question",
    subject: "Physics",
    time: "4 hours ago",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    name: "You",
    action: "joined a study group",
    subject: "Computer Science",
    time: "Yesterday",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
    name: "Michael Brown",
    action: "shared a resource",
    subject: "Biology",
    time: "2 days ago",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40&text=EJ",
    name: "Emma Johnson",
    action: "commented on your answer",
    subject: "Mathematics",
    time: "3 days ago",
  },
]

// Define sessions outside the component
const sessions = [
  {
    id: 1,
    groupName: "Calculus Masters",
    subject: "Mathematics",
    date: "May 15, 2023",
    time: "3:00 PM",
    duration: "1 hour",
  },
  {
    id: 2,
    groupName: "Quantum Explorers",
    subject: "Physics",
    date: "May 16, 2023",
    time: "4:30 PM",
    duration: "1.5 hours",
  },
  {
    id: 3,
    groupName: "Code Wizards",
    subject: "Computer Science",
    date: "May 17, 2023",
    time: "6:00 PM",
    duration: "2 hours",
  },
]

// Define recommendations outside the component
const recommendations = [
  {
    id: 1,
    title: "Advanced Calculus Techniques",
    description: "Master complex calculus problems with these advanced techniques.",
    icon: Brain,
    badge: "Mathematics",
  },
  {
    id: 2,
    title: "Physics Study Group",
    description: "Join a group of students discussing quantum mechanics.",
    icon: Users,
    badge: "Physics",
  },
  {
    id: 3,
    title: "New Computer Science eBook",
    description: "Explore the latest addition to our digital library on AI and Machine Learning.",
    icon: BookOpen,
    badge: "Computer Science",
  },
]

export function DashboardClient() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [progressValues, setProgressValues] = useState({
    mathematics: 0,
    physics: 0,
    computerScience: 0,
    biology: 0,
  })

  useEffect(() => {
    setMounted(true)

    // Animate progress bars after component mounts
    const timer = setTimeout(() => {
      setProgressValues({
        mathematics: 78,
        physics: 65,
        computerScience: 92,
        biology: 45,
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Ankush!</h2>
          <p className="text-muted-foreground">Here's what's happening with your learning journey today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
          <Button size="sm" className="h-9 gap-1">
            <Plus className="h-4 w-4" />
            <span>New Study Session</span>
          </Button>
        </div>
      </div>

      {/* Main Features */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="block h-full">
            <Card className="h-full transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`${feature.color} text-white p-2 rounded-lg`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between group">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="bg-primary/10 p-2 rounded-full">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                <TrendingUp className={`mr-1 h-3 w-3 ${stat.trend === "down" && "rotate-180"}`} />
                <span>{stat.change} this week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>View your progress across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Mathematics Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mathematics</span>
                    <span className="text-sm font-bold text-primary">{progressValues.mathematics}%</span>
                  </div>
                  <Progress value={progressValues.mathematics} className="h-2 transition-all duration-1000 ease-out" />
                </div>

                {/* Physics Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Physics</span>
                    <span className="text-sm font-bold text-primary">{progressValues.physics}%</span>
                  </div>
                  <Progress value={progressValues.physics} className="h-2 transition-all duration-1000 ease-out" />
                </div>

                {/* Computer Science Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Computer Science</span>
                    <span className="text-sm font-bold text-primary">{progressValues.computerScience}%</span>
                  </div>
                  <Progress
                    value={progressValues.computerScience}
                    className="h-2 transition-all duration-1000 ease-out"
                  />
                </div>

                {/* Biology Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Biology</span>
                    <span className="text-sm font-bold text-primary">{progressValues.biology}%</span>
                  </div>
                  <Progress value={progressValues.biology} className="h-2 transition-all duration-1000 ease-out" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>In-depth analysis of your learning metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <LineChart className="h-10 w-10 text-primary" />
                  <p>Interactive analytics visualization</p>
                  <div className="grid grid-cols-7 w-full gap-2 mt-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                      const heights = [75, 96, 54, 120, 105, 60, 45]
                      return (
                        <div key={day} className="flex flex-col items-center">
                          <div
                            className="bg-primary/80 rounded-t-md w-full"
                            style={{ height: `${heights[i] * 0.01 * 100}px` }}
                          ></div>
                          <span className="text-xs mt-1">{day}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Access and download your learning reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <PieChart className="h-10 w-10 text-primary" />
                  <p>Report generation interface would render here</p>
                  <p className="text-xs">With export options and scheduling</p>
                  <Button className="mt-4">Generate New Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Your learning activity for the past week</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-10 w-10 text-primary" />
                  <p>Interactive activity chart would render here</p>
                  <p className="text-xs">With hover effects and tooltips</p>
                  <div className="grid grid-cols-7 w-full gap-2 mt-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                      const heights = [60, 80, 40, 90, 70, 50, 30]
                      return (
                        <div key={`chart-${day}`} className="flex flex-col items-center">
                          <div
                            className="bg-primary/80 rounded-t-md w-full"
                            style={{ height: `${heights[i]}px` }}
                          ></div>
                          <span className="text-xs mt-1">{day}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-6">
                  {activities.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <Avatar>
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback>
                          {item.name
                            ? item.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <span className={item.name === "You" ? "text-primary font-semibold" : ""}>{item.name}</span>{" "}
                          {item.action}
                        </p>
                        <p className="text-sm text-muted-foreground">in {item.subject}</p>
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Study Sessions</CardTitle>
            <CardDescription>Your scheduled learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card key={session.id} className="transition-all duration-200 hover:shadow-md border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary p-3">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{session.groupName}</h3>
                          <Badge variant="outline" className="mt-1">
                            {session.subject}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{session.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        {session.time} ({session.duration})
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="ghost" className="w-full justify-center">
              <span>View All Sessions</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recommended Content */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your interests and recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((item) => (
                <Card key={item.id} className="transition-all duration-200 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary p-2">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {item.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Explore</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="ghost" className="w-full justify-center">
              <span>View All Recommendations</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

