"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileQuestion,
  Search,
  Plus,
  Clock,
  Calendar,
  BookOpen,
  Code,
  Atom,
  Calculator,
  Brain,
  CheckCircle,
  Users,
  Filter,
  ChevronRight,
} from "lucide-react"

export default function QuizVaultPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [difficulty, setDifficulty] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading quiz vault...</p>
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
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-green-500/20 via-green-500/10 to-background p-1"
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-black/10"></div>
        <div className="relative rounded-lg bg-background/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Quiz Vault</h1>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Access a collection of quizzes created by teams and educators across various subjects
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Quiz
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes by title or subject..."
            className="pl-8 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="border rounded-md px-3 py-2 bg-background text-sm"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="team">Team Quizzes</TabsTrigger>
          <TabsTrigger value="created">Created by You</TabsTrigger>
          <TabsTrigger value="attempted">Attempted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {quizzes.map((quiz, index) => (
              <motion.div key={quiz.id} variants={item}>
                <QuizCard quiz={quiz} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {quizzes
              .filter((q) => q.type === "team")
              .map((quiz, index) => (
                <motion.div key={quiz.id} variants={item}>
                  <QuizCard quiz={quiz} />
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="created" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {quizzes
              .filter((q) => q.createdBy === "You")
              .map((quiz, index) => (
                <motion.div key={quiz.id} variants={item}>
                  <QuizCard quiz={quiz} />
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="attempted" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {quizzes
              .filter((q) => q.attempted)
              .map((quiz, index) => (
                <motion.div key={quiz.id} variants={item}>
                  <QuizCard quiz={quiz} />
                </motion.div>
              ))}
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
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Your Quiz Statistics
            </CardTitle>
            <CardDescription>Track your quiz performance across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-3xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-3xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Quizzes Completed</div>
              </div>
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Perfect Scores</div>
              </div>
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Quizzes Created</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Statistics
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

function QuizCard({ quiz }) {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity from-green-500/20 to-blue-500/20"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            variant={
              quiz.difficulty === "Beginner" ? "outline" : quiz.difficulty === "Intermediate" ? "secondary" : "default"
            }
            className="mb-2"
          >
            {quiz.difficulty}
          </Badge>
          <Badge variant="outline">
            {quiz.category === "Mathematics" && <Calculator className="h-3 w-3 mr-1" />}
            {quiz.category === "Science" && <Atom className="h-3 w-3 mr-1" />}
            {quiz.category === "Literature" && <BookOpen className="h-3 w-3 mr-1" />}
            {quiz.category === "Coding" && <Code className="h-3 w-3 mr-1" />}
            {quiz.category === "Interdisciplinary" && <Brain className="h-3 w-3 mr-1" />}
            {quiz.category}
          </Badge>
        </div>
        <CardTitle className="text-lg">{quiz.title}</CardTitle>
        <CardDescription className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {quiz.duration} • {quiz.questions} questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            {quiz.type === "team" ? (
              <>
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Team Quiz</span>
              </>
            ) : (
              <>
                <FileQuestion className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Individual Quiz</span>
              </>
            )}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{quiz.createdDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full group-hover:bg-primary/90 transition-colors">
          {quiz.attempted ? "Retake Quiz" : "Start Quiz"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data with Indian names
const quizzes = [
  {
    id: 1,
    title: "Advanced Calculus Concepts",
    description: "Test your knowledge of advanced calculus concepts including limits, derivatives, and integrals.",
    category: "Mathematics",
    difficulty: "Advanced",
    duration: "45 minutes",
    questions: 20,
    type: "individual",
    createdBy: "Rahul Verma",
    createdDate: "2 weeks ago",
    attempted: true,
  },
  {
    id: 2,
    title: "Indian Literature Through Ages",
    description: "Explore the rich tradition of Indian literature from ancient texts to modern works.",
    category: "Literature",
    difficulty: "Intermediate",
    duration: "30 minutes",
    questions: 15,
    type: "team",
    createdBy: "Sahitya Sangam",
    createdDate: "1 month ago",
    attempted: false,
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, JavaScript and modern web development practices.",
    category: "Coding",
    difficulty: "Beginner",
    duration: "25 minutes",
    questions: 12,
    type: "individual",
    createdBy: "Arjun Sharma",
    createdDate: "3 weeks ago",
    attempted: true,
  },
  {
    id: 4,
    title: "Quantum Physics Challenge",
    description: "Dive into the fascinating world of quantum mechanics with this challenging quiz.",
    category: "Science",
    difficulty: "Advanced",
    duration: "60 minutes",
    questions: 25,
    type: "team",
    createdBy: "Quantum Minds",
    createdDate: "2 months ago",
    attempted: false,
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    description: "Test your knowledge of fundamental data structures and algorithms used in computer science.",
    category: "Coding",
    difficulty: "Intermediate",
    duration: "40 minutes",
    questions: 18,
    type: "individual",
    createdBy: "You",
    createdDate: "1 week ago",
    attempted: true,
  },
  {
    id: 6,
    title: "Indian History & Culture",
    description: "Explore the rich history and diverse cultural heritage of India through this comprehensive quiz.",
    category: "Interdisciplinary",
    difficulty: "Intermediate",
    duration: "35 minutes",
    questions: 20,
    type: "team",
    createdBy: "Itihaas Explorers",
    createdDate: "3 weeks ago",
    attempted: false,
  },
]

