"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, ArrowUp, ArrowDown, Minus, Calendar, Filter, Users } from "lucide-react"

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState("teams")
  const [timeframe, setTimeframe] = useState("weekly")
  const [category, setCategory] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading leaderboards...</p>
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
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-background p-1"
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-black/10"></div>
        <div className="relative rounded-lg bg-background/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Leaderboards</h1>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Track individual and team rankings across different categories
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="teams">Team Rankings</TabsTrigger>
          <TabsTrigger value="individuals">Individual Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Top 3 Teams */}
              {teamRankings.slice(0, 3).map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    className={`text-center h-full border-2 ${
                      index === 0 ? "border-[#FFD700] shadow-lg" : index === 1 ? "border-[#C0C0C0]" : "border-[#CD7F32]"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div
                        className={`mx-auto ${
                          index === 0 ? "bg-[#FFD700]/20" : index === 1 ? "bg-[#C0C0C0]/20" : "bg-[#CD7F32]/20"
                        } p-3 rounded-full`}
                      >
                        {index === 0 ? (
                          <Trophy
                            className={`h-10 w-10 ${
                              index === 0 ? "text-[#FFD700]" : index === 1 ? "text-[#C0C0C0]" : "text-[#CD7F32]"
                            }`}
                          />
                        ) : (
                          <Medal
                            className={`h-8 w-8 ${
                              index === 0 ? "text-[#FFD700]" : index === 1 ? "text-[#C0C0C0]" : "text-[#CD7F32]"
                            }`}
                          />
                        )}
                      </div>
                      <CardTitle className={`${index === 0 ? "text-2xl" : "text-xl"} mt-2`}>
                        {index === 0 ? "1st Place" : index === 1 ? "2nd Place" : "3rd Place"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Avatar className={`${index === 0 ? "h-24 w-24" : "h-20 w-20"} mx-auto mb-4`}>
                        <AvatarImage src={team.avatar} alt={team.name} />
                        <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className={`${index === 0 ? "text-2xl" : "text-xl"} font-bold`}>{team.name}</h3>
                      <p className="text-muted-foreground">{team.members} members</p>
                      <div className="mt-4">
                        <Badge
                          className={`${
                            index === 0 ? "bg-[#FFD700] text-black" : index === 1 ? "bg-[#C0C0C0]" : "bg-[#CD7F32]"
                          }`}
                        >
                          {team.points.toLocaleString()} points
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Team Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Rank</th>
                        <th className="text-left py-3 px-4">Team</th>
                        <th className="text-left py-3 px-4">Members</th>
                        <th className="text-left py-3 px-4">Points</th>
                        <th className="text-left py-3 px-4">Change</th>
                        <th className="text-left py-3 px-4">Achievements</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamRankings.map((team, index) => (
                        <motion.tr key={team.id} variants={item} className="border-b">
                          <td className="py-3 px-4 font-medium">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={team.avatar} alt={team.name} />
                                <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{team.name}</div>
                                <div className="text-xs text-muted-foreground">{team.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{team.members}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{team.points.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            {team.change > 0 ? (
                              <div className="flex items-center text-green-500">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span>+{team.change}</span>
                              </div>
                            ) : team.change < 0 ? (
                              <div className="flex items-center text-red-500">
                                <ArrowDown className="h-4 w-4 mr-1" />
                                <span>{team.change}</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-muted-foreground">
                                <Minus className="h-4 w-4 mr-1" />
                                <span>0</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              {team.achievements.map((achievement, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Special Team Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamAwards.map((award, index) => (
                    <motion.div
                      key={award.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <Card className="border-2 border-primary/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <award.icon className="h-5 w-5 mr-2 text-primary" />
                            {award.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={award.team.avatar} alt={award.team.name} />
                              <AvatarFallback>{award.team.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{award.team.name}</div>
                          </div>
                          <p className="text-sm text-muted-foreground">{award.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="individuals" className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Top 3 Individuals */}
              {individualRankings.slice(0, 3).map((individual, index) => (
                <motion.div
                  key={individual.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    className={`text-center h-full border-2 ${
                      index === 0 ? "border-[#FFD700] shadow-lg" : index === 1 ? "border-[#C0C0C0]" : "border-[#CD7F32]"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div
                        className={`mx-auto ${
                          index === 0 ? "bg-[#FFD700]/20" : index === 1 ? "bg-[#C0C0C0]/20" : "bg-[#CD7F32]/20"
                        } p-3 rounded-full`}
                      >
                        {index === 0 ? (
                          <Trophy
                            className={`h-10 w-10 ${
                              index === 0 ? "text-[#FFD700]" : index === 1 ? "text-[#C0C0C0]" : "text-[#CD7F32]"
                            }`}
                          />
                        ) : (
                          <Medal
                            className={`h-8 w-8 ${
                              index === 0 ? "text-[#FFD700]" : index === 1 ? "text-[#C0C0C0]" : "text-[#CD7F32]"
                            }`}
                          />
                        )}
                      </div>
                      <CardTitle className={`${index === 0 ? "text-2xl" : "text-xl"} mt-2`}>
                        {index === 0 ? "1st Place" : index === 1 ? "2nd Place" : "3rd Place"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Avatar className={`${index === 0 ? "h-24 w-24" : "h-20 w-20"} mx-auto mb-4`}>
                        <AvatarImage src={individual.avatar} alt={individual.name} />
                        <AvatarFallback>{individual.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className={`${index === 0 ? "text-2xl" : "text-xl"} font-bold`}>{individual.name}</h3>
                      <p className="text-muted-foreground">{individual.specialty}</p>
                      <div className="mt-4">
                        <Badge
                          className={`${
                            index === 0 ? "bg-[#FFD700] text-black" : index === 1 ? "bg-[#C0C0C0]" : "bg-[#CD7F32]"
                          }`}
                        >
                          {individual.points.toLocaleString()} points
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Individual Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Rank</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Team</th>
                        <th className="text-left py-3 px-4">Points</th>
                        <th className="text-left py-3 px-4">Change</th>
                        <th className="text-left py-3 px-4">Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {individualRankings.map((individual, index) => (
                        <motion.tr key={individual.id} variants={item} className="border-b">
                          <td className="py-3 px-4 font-medium">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={individual.avatar} alt={individual.name} />
                                <AvatarFallback>{individual.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{individual.name}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{individual.team}</td>
                          <td className="py-3 px-4 font-medium">{individual.points.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            {individual.change > 0 ? (
                              <div className="flex items-center text-green-500">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span>+{individual.change}</span>
                              </div>
                            ) : individual.change < 0 ? (
                              <div className="flex items-center text-red-500">
                                <ArrowDown className="h-4 w-4 mr-1" />
                                <span>{individual.change}</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-muted-foreground">
                                <Minus className="h-4 w-4 mr-1" />
                                <span>0</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              {individual.badges.map((badge, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data with Indian names
const teamRankings = [
  {
    id: 1,
    name: "Code Chakra",
    category: "Coding",
    members: 12,
    points: 12450,
    change: 3,
    achievements: ["Coding Masters", "Problem Solvers"],
    avatar: "/placeholder.svg?height=40&width=40&text=CC",
  },
  {
    id: 2,
    name: "Quantum Minds",
    category: "Science",
    members: 8,
    points: 11280,
    change: 1,
    achievements: ["Most Innovative", "Science Champions"],
    avatar: "/placeholder.svg?height=40&width=40&text=QM",
  },
  {
    id: 3,
    name: "Sahitya Sangam",
    category: "Literature",
    members: 7,
    points: 10950,
    change: -1,
    achievements: ["Creative Excellence"],
    avatar: "/placeholder.svg?height=40&width=40&text=SS",
  },
  {
    id: 4,
    name: "Ganit Gurus",
    category: "Mathematics",
    members: 9,
    points: 9870,
    change: 2,
    achievements: ["Math Champions"],
    avatar: "/placeholder.svg?height=40&width=40&text=GG",
  },
  {
    id: 5,
    name: "Vigyan Vishwa",
    category: "Science",
    members: 10,
    points: 8640,
    change: 0,
    achievements: ["Scientific Breakthrough"],
    avatar: "/placeholder.svg?height=40&width=40&text=VV",
  },
  {
    id: 6,
    name: "Tech Tantrik",
    category: "Coding",
    members: 11,
    points: 7920,
    change: -2,
    achievements: ["Innovation Award"],
    avatar: "/placeholder.svg?height=40&width=40&text=TT",
  },
  {
    id: 7,
    name: "Itihaas Explorers",
    category: "History",
    members: 8,
    points: 7350,
    change: 1,
    achievements: ["Research Excellence"],
    avatar: "/placeholder.svg?height=40&width=40&text=IE",
  },
]

const individualRankings = [
  {
    id: 1,
    name: "Arjun Sharma",
    team: "Code Chakra",
    specialty: "Programming Prodigy",
    points: 4250,
    change: 0,
    badges: ["Coding Expert", "Algorithm Master", "Team Leader"],
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
  },
  {
    id: 2,
    name: "Priya Patel",
    team: "Sahitya Sangam",
    specialty: "Literature Expert",
    points: 3980,
    change: 2,
    badges: ["Creative Writer", "Critical Thinker"],
    avatar: "/placeholder.svg?height=40&width=40&text=PP",
  },
  {
    id: 3,
    name: "Vikram Singh",
    team: "Quantum Minds",
    specialty: "Physics Enthusiast",
    points: 3720,
    change: -1,
    badges: ["Science Whiz", "Quantum Physics"],
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
  },
  {
    id: 4,
    name: "Neha Gupta",
    team: "Ganit Gurus",
    specialty: "Mathematics Genius",
    points: 3540,
    change: 1,
    badges: ["Number Theory", "Calculus Pro"],
    avatar: "/placeholder.svg?height=40&width=40&text=NG",
  },
  {
    id: 5,
    name: "Rahul Verma",
    team: "Tech Tantrik",
    specialty: "Software Developer",
    points: 3350,
    change: 3,
    badges: ["Web Development", "Cloud Computing"],
    avatar: "/placeholder.svg?height=40&width=40&text=RV",
  },
  {
    id: 6,
    name: "Ananya Desai",
    team: "Vigyan Vishwa",
    specialty: "Biology Researcher",
    points: 3120,
    change: 0,
    badges: ["Molecular Biology", "Research"],
    avatar: "/placeholder.svg?height=40&width=40&text=AD",
  },
  {
    id: 7,
    name: "Karan Malhotra",
    team: "Quantum Minds",
    specialty: "Chemistry Expert",
    points: 2980,
    change: -2,
    badges: ["Organic Chemistry", "Lab Skills"],
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
]

const teamAwards = [
  {
    title: "Most Innovative Solutions",
    team: { name: "Quantum Minds", avatar: "/placeholder.svg?height=32&width=32&text=QM" },
    description: "Consistently developed creative approaches to complex problems across multiple disciplines.",
    icon: Award,
  },
  {
    title: "Best Teamwork",
    team: { name: "Code Chakra", avatar: "/placeholder.svg?height=32&width=32&text=CC" },
    description: "Demonstrated exceptional collaboration and communication skills during team challenges.",
    icon: Users,
  },
  {
    title: "Fastest Problem Solvers",
    team: { name: "Ganit Gurus", avatar: "/placeholder.svg?height=32&width=32&text=GG" },
    description: "Completed challenges with remarkable speed while maintaining high accuracy.",
    icon: Trophy,
  },
]

