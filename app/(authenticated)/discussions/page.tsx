"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus, ThumbsUp, Eye } from "lucide-react"

export default function DiscussionsPage() {
  const [activeBoard, setActiveBoard] = useState("general")

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Discussion Boards</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1"
        >
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Boards</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Tabs orientation="vertical" value={activeBoard} onValueChange={setActiveBoard}>
                  <TabsList className="w-full">
                    {discussionBoards.map((board) => (
                      <TabsTrigger key={board.id} value={board.id} className="justify-start w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {board.name}
                        {board.unread > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {board.unread}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-3"
        >
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>{discussionBoards.find((board) => board.id === activeBoard)?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {discussions[activeBoard]?.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="mb-4">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={discussion.avatar} />
                              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{discussion.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                            </div>
                          </div>
                          <Badge>{discussion.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{discussion.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex space-x-4 text-muted-foreground">
                          <span className="flex items-center">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {discussion.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {discussion.comments}
                          </span>
                          <span className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            {discussion.views}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

const discussionBoards = [
  { id: "general", name: "General Discussion", unread: 0 },
  { id: "mathematics", name: "Mathematics", unread: 3 },
  { id: "physics", name: "Physics", unread: 1 },
  { id: "computer-science", name: "Computer Science", unread: 0 },
  { id: "biology", name: "Biology", unread: 2 },
]

const discussions = {
  general: [
    {
      id: 1,
      title: "The Future of Online Learning",
      author: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      category: "Education",
      excerpt: "As we move towards a more digital world, how do you think online learning will evolve?",
      likes: 15,
      comments: 7,
      views: 102,
    },
    {
      id: 2,
      title: "Balancing Study and Personal Life",
      author: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      category: "Lifestyle",
      excerpt: "What are your best tips for maintaining a healthy balance between studying and personal life?",
      likes: 23,
      comments: 12,
      views: 156,
    },
  ],
  mathematics: [
    {
      id: 3,
      title: "Understanding Calculus: Tips and Tricks",
      author: "Prof. Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
      category: "Calculus",
      excerpt: "Let's discuss some strategies for mastering calculus concepts. What works best for you?",
      likes: 45,
      comments: 18,
      views: 230,
    },
    {
      id: 4,
      title: "The Beauty of Fractals in Nature",
      author: "Math Enthusiast",
      avatar: "/placeholder.svg?height=40&width=40&text=ME",
      category: "Fractals",
      excerpt: "Fractals are fascinating mathematical concepts that appear in nature. Let's explore some examples!",
      likes: 37,
      comments: 9,
      views: 185,
    },
  ],
  physics: [
    {
      id: 5,
      title: "Quantum Entanglement Explained",
      author: "Dr. Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=DB",
      category: "Quantum Physics",
      excerpt: "Quantum entanglement is a fascinating phenomenon. Let's break it down in simple terms.",
      likes: 56,
      comments: 23,
      views: 312,
    },
    {
      id: 6,
      title: "The Search for Dark Matter",
      author: "Astrophysicist",
      avatar: "/placeholder.svg?height=40&width=40&text=AP",
      category: "Astrophysics",
      excerpt: "What do we know about dark matter so far, and what are the current theories?",
      likes: 41,
      comments: 15,
      views: 278,
    },
  ],
  "computer-science": [
    {
      id: 7,
      title: "The Rise of Quantum Computing",
      author: "Tech Guru",
      avatar: "/placeholder.svg?height=40&width=40&text=TG",
      category: "Quantum Computing",
      excerpt: "How will quantum computing change the landscape of computer science and technology?",
      likes: 62,
      comments: 28,
      views: 405,
    },
    {
      id: 8,
      title: "Ethical Considerations in AI Development",
      author: "AI Researcher",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
      category: "Artificial Intelligence",
      excerpt: "As AI becomes more advanced, what ethical guidelines should we consider?",
      likes: 53,
      comments: 31,
      views: 367,
    },
  ],
  biology: [
    {
      id: 9,
      title: "CRISPR Technology: Possibilities and Concerns",
      author: "BioProf",
      avatar: "/placeholder.svg?height=40&width=40&text=BP",
      category: "Genetics",
      excerpt:
        "CRISPR gene editing technology has immense potential. Let's discuss its applications and ethical implications.",
      likes: 48,
      comments: 22,
      views: 289,
    },
    {
      id: 10,
      title: "The Microbiome: Our Hidden Ecosystem",
      author: "Microbiologist",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
      category: "Microbiology",
      excerpt:
        "The human microbiome plays a crucial role in our health. What recent discoveries have been made in this field?",
      likes: 39,
      comments: 17,
      views: 246,
    },
  ],
}

