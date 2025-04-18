"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Trophy, Medal, Calendar, ChevronRight } from "lucide-react"

export default function HallOfFamePage() {
  const [activeTab, setActiveTab] = useState("teams")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading hall of fame...</p>
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
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-background p-1"
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-black/10"></div>
        <div className="relative rounded-lg bg-background/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Hall of Fame</h1>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Celebrating the achievements of outstanding teams and individuals across all time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30">
                <Star className="h-3 w-3 mr-1" />
                All-Time Rankings
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="teams">Legendary Teams</TabsTrigger>
          <TabsTrigger value="individuals">Legendary Individuals</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Top 3 Teams */}
            {legendaryTeams.slice(0, 3).map((team, index) => (
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
                      {index === 0 ? "Hall of Fame Champion" : index === 1 ? "Legendary Team" : "Elite Team"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Avatar className={`${index === 0 ? "h-24 w-24" : "h-20 w-20"} mx-auto mb-4`}>
                      <AvatarImage src={team.avatar} alt={team.name} />
                      <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className={`${index === 0 ? "text-2xl" : "text-xl"} font-bold`}>{team.name}</h3>
                    <p className="text-muted-foreground">{team.category}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>{team.achievements} achievements</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{team.points.toLocaleString()} all-time points</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Team Profile</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Hall of Fame Teams
                </CardTitle>
                <CardDescription>Teams that have made history with their exceptional achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {legendaryTeams.slice(3).map((team, index) => (
                    <motion.div
                      key={team.id}
                      variants={item}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 4}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={team.avatar} alt={team.name} />
                          <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground">{team.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{team.points.toLocaleString()} points</div>
                          <div className="text-sm text-muted-foreground">{team.achievements} achievements</div>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Hall of Fame Teams
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="individuals" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Top 3 Individuals */}
            {legendaryIndividuals.slice(0, 3).map((individual, index) => (
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
                      {index === 0 ? "Hall of Fame Champion" : index === 1 ? "Legendary Scholar" : "Elite Scholar"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Avatar className={`${index === 0 ? "h-24 w-24" : "h-20 w-20"} mx-auto mb-4`}>
                      <AvatarImage src={individual.avatar} alt={individual.name} />
                      <AvatarFallback>{individual.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className={`${index === 0 ? "text-2xl" : "text-xl"} font-bold`}>{individual.name}</h3>
                    <p className="text-muted-foreground">{individual.specialty}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>{individual.badges} badges earned</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{individual.points.toLocaleString()} all-time points</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Profile</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Hall of Fame Individuals
                </CardTitle>
                <CardDescription>Scholars who have demonstrated exceptional knowledge and skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {legendaryIndividuals.slice(3).map((individual, index) => (
                    <motion.div
                      key={individual.id}
                      variants={item}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 4}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={individual.avatar} alt={individual.name} />
                          <AvatarFallback>{individual.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{individual.name}</div>
                          <div className="text-sm text-muted-foreground">{individual.specialty}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{individual.points.toLocaleString()} points</div>
                          <div className="text-sm text-muted-foreground">{individual.badges} badges</div>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Hall of Fame Individuals
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Hall of Fame Timeline
            </CardTitle>
            <CardDescription>Key milestones and achievements throughout the platform's history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-8 py-2">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-primary"></div>
                  <div className="mb-1 text-sm text-muted-foreground">{event.date}</div>
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                  {event.team && (
                    <div className="mt-2 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.team.avatar} alt={event.team.name} />
                        <AvatarFallback>{event.team.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{event.team.name}</span>
                    </div>
                  )}
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
const legendaryTeams = [
  {
    id: 1,
    name: "Code Chakra",
    category: "Coding",
    achievements: 48,
    points: 28750,
    avatar: "/placeholder.svg?height=48&width=48&text=CC",
  },
  {
    id: 2,
    name: "Quantum Minds",
    category: "Science",
    achievements: 42,
    points: 25680,
    avatar: "/placeholder.svg?height=48&width=48&text=QM",
  },
  {
    id: 3,
    name: "Ganit Gurus",
    category: "Mathematics",
    achievements: 39,
    points: 23450,
    avatar: "/placeholder.svg?height=48&width=48&text=GG",
  },
  {
    id: 4,
    name: "Sahitya Sangam",
    category: "Literature",
    achievements: 35,
    points: 21200,
    avatar: "/placeholder.svg?height=48&width=48&text=SS",
  },
  {
    id: 5,
    name: "Tech Tantrik",
    category: "Coding",
    achievements: 32,
    points: 19800,
    avatar: "/placeholder.svg?height=48&width=48&text=TT",
  },
  {
    id: 6,
    name: "Vigyan Vishwa",
    category: "Science",
    achievements: 30,
    points: 18500,
    avatar: "/placeholder.svg?height=48&width=48&text=VV",
  },
  {
    id: 7,
    name: "Itihaas Explorers",
    category: "History",
    achievements: 28,
    points: 17200,
    avatar: "/placeholder.svg?height=48&width=48&text=IE",
  },
]

const legendaryIndividuals = [
  {
    id: 1,
    name: "Arjun Sharma",
    specialty: "Programming Prodigy",
    badges: 32,
    points: 15250,
    avatar: "/placeholder.svg?height=48&width=48&text=AS",
  },
  {
    id: 2,
    name: "Priya Patel",
    specialty: "Literature Expert",
    badges: 28,
    points: 13980,
    avatar: "/placeholder.svg?height=48&width=48&text=PP",
  },
  {
    id: 3,
    name: "Vikram Singh",
    specialty: "Physics Enthusiast",
    badges: 26,
    points: 12720,
    avatar: "/placeholder.svg?height=48&width=48&text=VS",
  },
  {
    id: 4,
    name: "Neha Gupta",
    specialty: "Mathematics Genius",
    badges: 24,
    points: 11540,
    avatar: "/placeholder.svg?height=48&width=48&text=NG",
  },
  {
    id: 5,
    name: "Rahul Verma",
    specialty: "Software Developer",
    badges: 22,
    points: 10350,
    avatar: "/placeholder.svg?height=48&width=48&text=RV",
  },
  {
    id: 6,
    name: "Ananya Desai",
    specialty: "Biology Researcher",
    badges: 20,
    points: 9120,
    avatar: "/placeholder.svg?height=48&width=48&text=AD",
  },
  {
    id: 7,
    name: "Karan Malhotra",
    specialty: "Chemistry Expert",
    badges: 18,
    points: 8980,
    avatar: "/placeholder.svg?height=48&width=48&text=KM",
  },
]

const timelineEvents = [
  {
    date: "January 2023",
    title: "Platform Launch",
    description:
      "The collaborative learning platform was launched with initial features for team formation and basic challenges.",
  },
  {
    date: "March 2023",
    title: "First Team Championship",
    description:
      "The inaugural team championship was held with over 50 teams participating across various disciplines.",
    team: {
      name: "Code Chakra",
      avatar: "/placeholder.svg?height=32&width=32&text=CC",
    },
  },
  {
    date: "June 2023",
    title: "Advanced Collaboration Tools",
    description: "New collaboration tools were introduced, including real-time whiteboarding and document sharing.",
  },
  {
    date: "September 2023",
    title: "Science Olympiad",
    description:
      "The first specialized Science Olympiad was held, focusing on physics, chemistry, and biology challenges.",
    team: {
      name: "Quantum Minds",
      avatar: "/placeholder.svg?height=32&width=32&text=QM",
    },
  },
  {
    date: "December 2023",
    title: "Hall of Fame Established",
    description:
      "The Hall of Fame was established to recognize and celebrate outstanding achievements by teams and individuals.",
  },
]

