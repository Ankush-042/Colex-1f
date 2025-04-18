"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Target,
  FileQuestion,
  Pen,
  Award,
  Star,
  Users,
  Search,
  Plus,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle,
  BookOpen,
  Code,
  Atom,
  Calculator,
  Brain,
} from "lucide-react"

export default function TeamsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("explore")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading team hub...</p>
        </div>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/20 via-primary/10 to-background p-1"
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-black/10"></div>
        <div className="relative rounded-lg bg-background/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Team Collaboration Hub</h1>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Form teams, compete in challenges, collaborate in real-time, and showcase your achievements
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Team
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        {[
          {
            icon: Trophy,
            label: "Leaderboards",
            href: "/teams/leaderboards",
            description: "Track team rankings and achievements",
            color: "from-yellow-500/20 to-yellow-500/5",
          },
          {
            icon: Target,
            label: "Challenges",
            href: "/teams/challenges",
            description: "Compete in team-based challenges",
            color: "from-blue-500/20 to-blue-500/5",
          },
          {
            icon: FileQuestion,
            label: "Quiz Vault",
            href: "/teams/quiz-vault",
            description: "Access collaborative quizzes",
            color: "from-green-500/20 to-green-500/5",
          },
          {
            icon: Pen,
            label: "Collaboration",
            href: "/teams/collaboration",
            description: "Work together in real-time",
            color: "from-purple-500/20 to-purple-500/5",
          },
          {
            icon: Award,
            label: "Achievements",
            href: "/teams/achievements",
            description: "Showcase team accomplishments",
            color: "from-red-500/20 to-red-500/5",
          },
          {
            icon: Star,
            label: "Hall of Fame",
            href: "/teams/hall-of-fame",
            description: "View top-performing teams",
            color: "from-orange-500/20 to-orange-500/5",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Link href={item.href}>
              <Card className="h-full hover:border-primary/50 transition-all duration-200 hover:shadow-md bg-gradient-to-br overflow-hidden group">
                <div
                  className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.color} transition-opacity group-hover:opacity-30`}
                ></div>
                <CardHeader className="p-4 pb-2 relative">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3 transition-transform group-hover:scale-110">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2 text-center relative">
                  <h3 className="font-medium text-lg">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </CardContent>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams by name or subject..."
            className="pl-8 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="explore">Explore Teams</TabsTrigger>
            <TabsTrigger value="my-teams">My Teams</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="mt-6">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {exploreTeams.map((team, index) => (
                <motion.div key={team.id} variants={item}>
                  <Card className="h-full hover:shadow-md transition-all duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {team.category}
                        </Badge>
                        <Badge
                          className={
                            team.openings > 0 ? "bg-green-500/20 text-green-700" : "bg-yellow-500/20 text-yellow-700"
                          }
                        >
                          {team.openings > 0 ? `${team.openings} Openings` : "Full"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarImage src={team.avatar} alt={team.name} />
                          <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {team.members} members
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{team.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {team.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Rank:</span>
                          </div>
                          <span className="font-medium">#{team.rank}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Challenges:</span>
                          </div>
                          <span className="font-medium">{team.challenges} completed</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Created:</span>
                          </div>
                          <span className="font-medium">{team.created}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">{team.openings > 0 ? "Request to Join" : "View Team"}</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="my-teams" className="mt-6">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {myTeams.map((team, index) => (
                <motion.div key={team.id} variants={item}>
                  <Card className="h-full hover:shadow-md transition-all duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {team.category}
                        </Badge>
                        <Badge
                          className={
                            team.role === "Leader" ? "bg-blue-500/20 text-blue-700" : "bg-purple-500/20 text-purple-700"
                          }
                        >
                          {team.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarImage src={team.avatar} alt={team.name} />
                          <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {team.members} members
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Current Activity:</h4>
                        <div className="p-3 rounded-md bg-muted/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{team.currentActivity.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {team.currentActivity.type}
                            </Badge>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{team.currentActivity.deadline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Completed:</span>
                          </div>
                          <span className="font-medium">{team.completed} activities</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Next Meeting:</span>
                          </div>
                          <span className="font-medium">{team.nextMeeting}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Manage
                      </Button>
                      <Button className="flex-1">Collaborate</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="invitations" className="mt-6">
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {invitations.map((invitation, index) => (
                <motion.div key={invitation.id} variants={item}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={invitation.team.avatar} alt={invitation.team.name} />
                            <AvatarFallback>{invitation.team.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{invitation.team.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Badge variant="outline" className="mr-2 text-xs">
                                {invitation.team.category}
                              </Badge>
                              <Users className="h-3 w-3 mr-1" />
                              <span>{invitation.team.members} members</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-right">
                            <div className="text-muted-foreground">Invited by</div>
                            <div className="font-medium">{invitation.invitedBy}</div>
                            <div className="text-xs text-muted-foreground">{invitation.date}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">Decline</Button>
                            <Button>Accept</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Featured Teams
            </CardTitle>
            <CardDescription>Top-performing teams across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTeams.map((team, index) => (
                <div key={team.id} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {team.category === "Mathematics" && <Calculator className="h-5 w-5 text-primary" />}
                    {team.category === "Science" && <Atom className="h-5 w-5 text-primary" />}
                    {team.category === "Literature" && <BookOpen className="h-5 w-5 text-primary" />}
                    {team.category === "Coding" && <Code className="h-5 w-5 text-primary" />}
                    {team.category === "Interdisciplinary" && <Brain className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{team.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Badge variant="outline" className="mr-2 text-xs">
                        {team.category}
                      </Badge>
                      <span>#{team.rank} in ranking</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Sample data with Indian names
const exploreTeams = [
  {
    id: 1,
    name: "Quantum Minds",
    description: "A team focused on advanced physics and mathematics concepts, working on complex problem-solving.",
    category: "Science",
    members: 8,
    openings: 2,
    tags: ["Physics", "Mathematics", "Research"],
    rank: 3,
    challenges: 24,
    created: "2 months ago",
    avatar: "/placeholder.svg?height=48&width=48&text=QM",
  },
  {
    id: 2,
    name: "Code Chakra",
    description: "Passionate programmers collaborating on coding challenges and building innovative applications.",
    category: "Coding",
    members: 12,
    openings: 0,
    tags: ["Programming", "Web Development", "AI"],
    rank: 1,
    challenges: 32,
    created: "4 months ago",
    avatar: "/placeholder.svg?height=48&width=48&text=CC",
  },
  {
    id: 3,
    name: "Sahitya Sangam",
    description: "Literary enthusiasts exploring classic and contemporary literature from around the world.",
    category: "Literature",
    members: 7,
    openings: 3,
    tags: ["Poetry", "Fiction", "Literary Analysis"],
    rank: 8,
    challenges: 18,
    created: "3 months ago",
    avatar: "/placeholder.svg?height=48&width=48&text=SS",
  },
  {
    id: 4,
    name: "Ganit Gurus",
    description: "Mathematics specialists tackling advanced mathematical problems and exploring new theorems.",
    category: "Mathematics",
    members: 9,
    openings: 1,
    tags: ["Calculus", "Number Theory", "Statistics"],
    rank: 5,
    challenges: 27,
    created: "5 months ago",
    avatar: "/placeholder.svg?height=48&width=48&text=GG",
  },
  {
    id: 5,
    name: "Vigyan Vishwa",
    description: "Science enthusiasts exploring various scientific disciplines through experiments and research.",
    category: "Science",
    members: 10,
    openings: 0,
    tags: ["Biology", "Chemistry", "Environmental Science"],
    rank: 7,
    challenges: 21,
    created: "2 months ago",
    avatar: "/placeholder.svg?height=48&width=48&text=VV",
  },
  {
    id: 6,
    name: "Tech Tantrik",
    description: "Technology innovators working on cutting-edge tech projects and software development.",
    category: "Coding",
    members: 11,
    openings: 2,
    tags: ["Mobile Development", "Cloud Computing", "IoT"],
    rank: 4,
    challenges: 29,
    created: "3 months ago",
    avatar: "/placeholder.svg?height=48&width=48&text=TT",
  },
]

const myTeams = [
  {
    id: 101,
    name: "Code Chakra",
    category: "Coding",
    members: 12,
    role: "Leader",
    currentActivity: {
      title: "Web App Development Challenge",
      type: "Challenge",
      deadline: "Due in 3 days",
    },
    completed: 32,
    nextMeeting: "Tomorrow, 4:00 PM",
    avatar: "/placeholder.svg?height=48&width=48&text=CC",
  },
  {
    id: 102,
    name: "Ganit Gurus",
    category: "Mathematics",
    members: 9,
    role: "Member",
    currentActivity: {
      title: "Advanced Calculus Quiz",
      type: "Quiz",
      deadline: "Due in 1 day",
    },
    completed: 27,
    nextMeeting: "Friday, 5:30 PM",
    avatar: "/placeholder.svg?height=48&width=48&text=GG",
  },
  {
    id: 103,
    name: "Vigyan Vishwa",
    category: "Science",
    members: 10,
    role: "Member",
    currentActivity: {
      title: "Physics Experiment Design",
      type: "Project",
      deadline: "Due in 5 days",
    },
    completed: 21,
    nextMeeting: "Monday, 3:00 PM",
    avatar: "/placeholder.svg?height=48&width=48&text=VV",
  },
]

const invitations = [
  {
    id: 201,
    team: {
      name: "Quantum Minds",
      category: "Science",
      members: 8,
      avatar: "/placeholder.svg?height=48&width=48&text=QM",
    },
    invitedBy: "Arjun Sharma",
    date: "2 days ago",
  },
  {
    id: 202,
    team: {
      name: "Sahitya Sangam",
      category: "Literature",
      members: 7,
      avatar: "/placeholder.svg?height=48&width=48&text=SS",
    },
    invitedBy: "Priya Patel",
    date: "Yesterday",
  },
]

const featuredTeams = [
  {
    id: 301,
    name: "Code Chakra",
    category: "Coding",
    rank: 1,
  },
  {
    id: 302,
    name: "Quantum Minds",
    category: "Science",
    rank: 3,
  },
  {
    id: 303,
    name: "Ganit Gurus",
    category: "Mathematics",
    rank: 5,
  },
  {
    id: 304,
    name: "Sahitya Sangam",
    category: "Literature",
    rank: 8,
  },
  {
    id: 305,
    name: "Tech Tantrik",
    category: "Coding",
    rank: 4,
  },
  {
    id: 306,
    name: "Gyaan Sangam",
    category: "Interdisciplinary",
    rank: 2,
  },
]

