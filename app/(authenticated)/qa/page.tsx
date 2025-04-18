"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, MessageSquare, Filter } from "lucide-react"

export default function QAPage() {
  const [activeTab, setActiveTab] = useState("recent")

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Q&A Platform</h1>
        <Button>Ask a Question</Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Search Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input placeholder="Search for questions..." className="flex-1" />
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="recent">Recent Questions</TabsTrigger>
            <TabsTrigger value="popular">Popular Questions</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <QuestionList questions={recentQuestions} />
          </TabsContent>
          <TabsContent value="popular">
            <QuestionList questions={popularQuestions} />
          </TabsContent>
          <TabsContent value="unanswered">
            <QuestionList questions={unansweredQuestions} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function QuestionList({ questions }) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <QuestionCard {...question} />
        </motion.div>
      ))}
    </div>
  )
}

function QuestionCard({ title, content, author, avatar, subject, votes, answers, time }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{author}</span>
              <span>•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
        <div className="mt-4 flex items-center space-x-2">
          <Badge variant="secondary">{subject}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            {votes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            {answers} Answers
          </Button>
        </div>
        <Button variant="outline" size="sm">
          View Question
        </Button>
      </CardFooter>
    </Card>
  )
}

const recentQuestions = [
  {
    id: 1,
    title: "How do I solve this differential equation?",
    content: "I'm struggling with solving dx/dt = 2x + t. Can someone help me understand the steps?",
    author: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    subject: "Mathematics",
    votes: 5,
    answers: 2,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "What's the difference between RAM and ROM?",
    content: "I'm confused about the roles of RAM and ROM in computer systems. Can someone explain?",
    author: "Alice Smith",
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    subject: "Computer Science",
    votes: 8,
    answers: 3,
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "How does photosynthesis work?",
    content: "I understand that plants use sunlight to create energy, but what are the specific steps involved?",
    author: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40&text=EW",
    subject: "Biology",
    votes: 12,
    answers: 4,
    time: "6 hours ago",
  },
]

const popularQuestions = [
  {
    id: 4,
    title: "What are the implications of quantum computing?",
    content:
      "I've heard a lot about quantum computing, but I'm not sure about its real-world applications. Can someone elaborate?",
    author: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
    subject: "Physics",
    votes: 25,
    answers: 7,
    time: "1 day ago",
  },
  {
    id: 5,
    title: "How do neural networks learn?",
    content:
      "I'm trying to understand the basics of machine learning. Can someone explain how neural networks process and learn from data?",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    subject: "Computer Science",
    votes: 30,
    answers: 9,
    time: "2 days ago",
  },
]

const unansweredQuestions = [
  {
    id: 6,
    title: "What's the significance of the Golgi apparatus?",
    content: "I'm studying cell biology and I'm not clear on the role of the Golgi apparatus. Can someone help?",
    author: "David Lee",
    avatar: "/placeholder.svg?height=40&width=40&text=DL",
    subject: "Biology",
    votes: 2,
    answers: 0,
    time: "1 hour ago",
  },
  {
    id: 7,
    title: "How do I approach proofs in abstract algebra?",
    content: "I'm having trouble with proofs in my abstract algebra course. Any tips or resources?",
    author: "Linda Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=LC",
    subject: "Mathematics",
    votes: 1,
    answers: 0,
    time: "3 hours ago",
  },
]

