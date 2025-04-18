"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Target,
  Users,
  User,
  Clock,
  Trophy,
  Star,
  BookOpen,
  Code,
  Atom,
  PenTool,
  Calculator,
  Filter,
  ChevronRight,
} from "lucide-react"

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("team")
  const [difficulty, setDifficulty] = useState("all")
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
          <p className="mt-4 text-lg">Loading challenges...</p>
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
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-background p-1"
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-black/10"></div>
        <div className="relative rounded-lg bg-background/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Team Challenges</h1>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Tackle challenges individually or as a team to earn points and climb the leaderboards
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[140px]">
                  <Target className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
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
          <TabsTrigger value="team">Team Challenges</TabsTrigger>
          <TabsTrigger value="individual">Individual Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {teamChallenges.map((challenge, index) => (
              <motion.div key={challenge.id} variants={item}>
                <ChallengeCard challenge={challenge} isTeam={true} index={index} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Team Tournament
                </CardTitle>
                <CardDescription>Compete against other teams in real-time tournaments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Vigyan Olympiad</h3>
                        <p className="text-sm text-muted-foreground">Starts in 2 days, 14 hours</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <p className="text-sm mb-4">
                      A multi-round tournament testing knowledge across physics, chemistry, and biology. Teams will
                      compete in real-time challenges requiring collaboration and quick thinking.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">24 teams registered</span>
                      </div>
                      <Button>Register Team</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Code Samurai Championship</h3>
                        <p className="text-sm text-muted-foreground">Starts in 5 days, 8 hours</p>
                      </div>
                      <Badge variant="outline">
                        <Code className="h-3 w-3 mr-1" />
                        Programming
                      </Badge>
                    </div>
                    <p className="text-sm mb-4">
                      Teams will solve algorithmic challenges and build mini-applications in a race against time.
                      Collaboration and efficient code are key to victory.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">18 teams registered</span>
                      </div>
                      <Button variant="outline">Register Team</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Tournaments
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="individual" className="space-y-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {individualChallenges.map((challenge, index) => (
              <motion.div key={challenge.id} variants={item}>
                <ChallengeCard challenge={challenge} isTeam={false} index={index} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Your Progress
                </CardTitle>
                <CardDescription>Track your individual challenge completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Calculator className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">Mathematics</span>
                      </div>
                      <span className="text-sm">12/20 completed</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Atom className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">Science</span>
                      </div>
                      <span className="text-sm">8/15 completed</span>
                    </div>
                    <Progress value={53} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">Literature</span>
                      </div>
                      <span className="text-sm">5/12 completed</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">Coding</span>
                      </div>
                      <span className="text-sm">10/18 completed</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Progress
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChallengeCard({ challenge, isTeam, index }) {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity from-blue-500/20 to-purple-500/20"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            variant={
              challenge.difficulty === "Beginner"
                ? "outline"
                : challenge.difficulty === "Intermediate"
                  ? "secondary"
                  : challenge.difficulty === "Advanced"
                    ? "default"
                    : "destructive"
            }
            className="mb-2"
          >
            {challenge.difficulty}
          </Badge>
          <Badge variant="outline">
            {challenge.category === "Mathematics" && <Calculator className="h-3 w-3 mr-1" />}
            {challenge.category === "Science" && <Atom className="h-3 w-3 mr-1" />}
            {challenge.category === "Literature" && <BookOpen className="h-3 w-3 mr-1" />}
            {challenge.category === "Coding" && <Code className="h-3 w-3 mr-1" />}
            {challenge.category === "Art" && <PenTool className="h-3 w-3 mr-1" />}
            {challenge.category}
          </Badge>
        </div>
        <CardTitle className="text-lg">{challenge.title}</CardTitle>
        <CardDescription className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {challenge.duration}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            {isTeam ? (
              <>
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{challenge.teamSize}</span>
              </>
            ) : (
              <>
                <User className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Individual</span>
              </>
            )}
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{challenge.points} points</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full group-hover:bg-primary/90 transition-colors">
          {isTeam ? "Start Team Challenge" : "Start Challenge"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data with Indian names
const teamChallenges = [
  {
    id: 1,
    title: "Quantum Physics Exploration",
    description: "Collaborate to solve complex quantum physics problems and design theoretical experiments.",
    difficulty: "Advanced",
    category: "Science",
    duration: "90 minutes",
    teamSize: "3-5 members",
    points: 500,
  },
  {
    id: 2,
    title: "Sanskrit Literature Analysis",
    description: "Analyze classical Sanskrit texts as a team, identifying themes, symbolism, and historical context.",
    difficulty: "Intermediate",
    category: "Literature",
    duration: "60 minutes",
    teamSize: "2-4 members",
    points: 350,
  },
  {
    id: 3,
    title: "Algorithm Design Challenge",
    description: "Work together to design and implement efficient algorithms for complex computational problems.",
    difficulty: "Expert",
    category: "Coding",
    duration: "120 minutes",
    teamSize: "2-3 members",
    points: 600,
  },
  {
    id: 4,
    title: "Vedic Mathematics Challenge",
    description: "Create mathematical models using Vedic mathematics to solve real-world problems.",
    difficulty: "Advanced",
    category: "Mathematics",
    duration: "90 minutes",
    teamSize: "3-4 members",
    points: 450,
  },
  {
    id: 5,
    title: "Digital Art Project",
    description: "Design and create a digital art piece that represents a scientific concept or historical event.",
    difficulty: "Beginner",
    category: "Art",
    duration: "45 minutes",
    teamSize: "2-6 members",
    points: 300,
  },
  {
    id: 6,
    title: "Web Application Development",
    description: "Build a functional web application that solves an educational problem or enhances learning.",
    difficulty: "Intermediate",
    category: "Coding",
    duration: "180 minutes",
    teamSize: "3-5 members",
    points: 550,
  },
]

const individualChallenges = [
  {
    id: 101,
    title: "Calculus Speed Challenge",
    description: "Solve a series of calculus problems against the clock, testing both accuracy and speed.",
    difficulty: "Advanced",
    category: "Mathematics",
    duration: "45 minutes",
    points: 400,
  },
  {
    id: 102,
    title: "Hindi Poetry Composition",
    description: "Compose a poem in Hindi following specific structural and thematic guidelines within a time limit.",
    difficulty: "Intermediate",
    category: "Literature",
    duration: "30 minutes",
    points: 250,
  },
  {
    id: 103,
    title: "Algorithm Implementation",
    description: "Implement a specified algorithm and optimize it for performance and memory usage.",
    difficulty: "Expert",
    category: "Coding",
    duration: "60 minutes",
    points: 500,
  },
  {
    id: 104,
    title: "Chemistry Problem Set",
    description: "Solve a variety of chemistry problems involving stoichiometry, thermodynamics, and kinetics.",
    difficulty: "Intermediate",
    category: "Science",
    duration: "40 minutes",
    points: 350,
  },
  {
    id: 105,
    title: "Historical Document Analysis",
    description: "Analyze a historical Indian document, identifying its significance, context, and implications.",
    difficulty: "Beginner",
    category: "Literature",
    duration: "25 minutes",
    points: 200,
  },
  {
    id: 106,
    title: "Data Visualization Challenge",
    description: "Create effective visualizations for a provided dataset to communicate key insights.",
    difficulty: "Intermediate",
    category: "Coding",
    duration: "50 minutes",
    points: 300,
  },
]

