"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollReveal, AnimatedInput, FeedbackMessage } from "@/components/ui/animations"
import {
  Camera,
  Edit,
  BookOpen,
  MessageCircle,
  Star,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Users,
  Brain,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showFeedback, setShowFeedback] = useState(false)

  const saveProfile = () => {
    setIsEditing(false)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 3000)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">My Profile</h1>
        {showFeedback && (
          <FeedbackMessage
            type="success"
            message="Profile updated successfully!"
            onClose={() => setShowFeedback(false)}
          />
        )}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4">
        <ScrollReveal className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-primary text-white"
                    onClick={() => setIsEditing(true)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">Computer Science Student</p>
                <div className="flex mt-2 space-x-1">
                  <Badge>Mathematics</Badge>
                  <Badge>Physics</Badge>
                  <Badge>CS</Badge>
                </div>
                <Button variant="outline" className="mt-4 w-full" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Education</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="font-medium">University of Example</div>
                    <div className="text-muted-foreground">B.S. Computer Science</div>
                    <div className="text-muted-foreground">2020 - 2024</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Social Media</h3>
                <div className="flex space-x-2">
                  <Button size="icon" variant="outline">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal className="md:col-span-3">
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="overview" className="mt-0">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <AnimatedInput label="First Name" defaultValue="John" />
                        <AnimatedInput label="Last Name" defaultValue="Doe" />
                        <AnimatedInput
                          label="Email"
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="md:col-span-2"
                        />
                        <AnimatedInput label="Phone" type="tel" defaultValue="+1 (555) 123-4567" />
                        <AnimatedInput label="Location" defaultValue="San Francisco, CA" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Bio</h3>
                      <textarea
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        defaultValue="Computer Science student passionate about AI and machine learning. I enjoy solving complex problems and collaborating with others on interesting projects."
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Education</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <AnimatedInput label="Institution" defaultValue="University of Example" />
                        <AnimatedInput label="Degree" defaultValue="B.S. Computer Science" />
                        <AnimatedInput label="Start Year" defaultValue="2020" />
                        <AnimatedInput label="End Year" defaultValue="2024" />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={saveProfile}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">About Me</h3>
                      <p className="text-muted-foreground">
                        Computer Science student passionate about AI and machine learning. I enjoy solving complex
                        problems and collaborating with others on interesting projects.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Mathematics</span>
                            <span className="text-sm text-muted-foreground">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Physics</span>
                            <span className="text-sm text-muted-foreground">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Computer Science</span>
                            <span className="text-sm text-muted-foreground">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Artificial Intelligence</Badge>
                        <Badge variant="outline">Machine Learning</Badge>
                        <Badge variant="outline">Web Development</Badge>
                        <Badge variant="outline">Data Science</Badge>
                        <Badge variant="outline">Quantum Computing</Badge>
                        <Badge variant="outline">Robotics</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <ActivityItem
                        icon={MessageCircle}
                        title="Asked a question"
                        description="How do I solve this differential equation?"
                        time="2 hours ago"
                        category="Mathematics"
                      />
                      <ActivityItem
                        icon={Star}
                        title="Received an upvote"
                        description="Your answer to 'What's the difference between RAM and ROM?' was upvoted"
                        time="4 hours ago"
                        category="Computer Science"
                      />
                      <ActivityItem
                        icon={BookOpen}
                        title="Added to library"
                        description="Machine Learning Fundamentals by Dr. Emily Chen"
                        time="Yesterday"
                        category="Computer Science"
                      />
                      <ActivityItem
                        icon={Users}
                        title="Joined a study group"
                        description="Quantum Explorers"
                        time="2 days ago"
                        category="Physics"
                      />
                      <ActivityItem
                        icon={MessageCircle}
                        title="Answered a question"
                        description="The solution involves using the chain rule..."
                        time="3 days ago"
                        category="Mathematics"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                    <div className="space-y-4">
                      <EventItem
                        title="Physics Study Group Session"
                        description="Quantum Mechanics Discussion"
                        date="May 15, 2023"
                        time="4:00 PM - 6:00 PM"
                      />
                      <EventItem
                        title="AI Workshop"
                        description="Introduction to Neural Networks"
                        date="May 18, 2023"
                        time="2:00 PM - 5:00 PM"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Badges Earned</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <BadgeCard
                        icon={Star}
                        title="Helper"
                        description="Answered 25+ questions"
                        color="bg-yellow-500"
                      />
                      <BadgeCard icon={Brain} title="Scholar" description="Completed 10+ courses" color="bg-blue-500" />
                      <BadgeCard
                        icon={Users}
                        title="Team Player"
                        description="Participated in 5+ group studies"
                        color="bg-purple-500"
                      />
                      <BadgeCard
                        icon={Award}
                        title="Top Contributor"
                        description="In the top 10% of contributors"
                        color="bg-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard title="Questions Asked" value="24" />
                      <StatCard title="Answers Provided" value="42" />
                      <StatCard title="Upvotes Received" value="128" />
                      <StatCard title="Study Hours" value="18.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Leaderboard Position</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                              7
                            </div>
                            <div>
                              <p className="font-medium">Top 10 Contributors</p>
                              <p className="text-sm text-muted-foreground">Computer Science Category</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">1,250 points</p>
                            <p className="text-sm text-muted-foreground">This month</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}

function ActivityItem({ icon: Icon, title, description, time, category }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-primary/10 rounded-full p-2">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <span className="text-sm text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {category && <Badge className="mt-1">{category}</Badge>}
      </div>
    </div>
  )
}

function EventItem({ title, description, date, time }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary">
        <Calendar className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{time}</span>
        </div>
      </div>
      <Button variant="outline" size="sm">
        Join
      </Button>
    </div>
  )
}

function BadgeCard({ icon: Icon, title, description, color }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className={`${color} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
          <Icon className="h-6 w-6" />
        </div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}

