"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Star,
  Trophy,
  Medal,
  Download,
  Share,
  Users,
  Calendar,
  Clock,
  BookOpen,
  Code,
  Target,
  Zap,
  Cpu,
  Brain,
  Lightbulb,
  Rocket,
  CheckCircle,
  User,
} from "lucide-react"

// Define the data arrays
const badges = [
  {
    id: 1,
    name: "Quick Learner",
    category: "Learning",
    description: "Completed 5 courses in under 30 days",
    earnedDate: "March 15, 2025",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Zap,
  },
  {
    id: 2,
    name: "Team Player",
    category: "Collaboration",
    description: "Participated in 10 team activities",
    earnedDate: "February 28, 2025",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    icon: Users,
  },
  {
    id: 3,
    name: "Problem Solver",
    category: "Skills",
    description: "Solved 25 complex problems",
    earnedDate: "January 10, 2025",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    icon: Brain,
  },
  {
    id: 4,
    name: "Knowledge Master",
    category: "Learning",
    description: "Achieved perfect scores in 3 consecutive quizzes",
    earnedDate: "March 5, 2025",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: BookOpen,
  },
  {
    id: 5,
    name: "Code Wizard",
    category: "Technical",
    description: "Completed 15 coding challenges",
    earnedDate: "February 12, 2025",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    icon: Code,
  },
  {
    id: 6,
    name: "Innovation Champion",
    category: "Creativity",
    description: "Proposed 3 innovative solutions that were implemented",
    earnedDate: "January 25, 2025",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    icon: Lightbulb,
  },
]

const badgesInProgress = [
  {
    id: 7,
    name: "Tech Explorer",
    category: "Technical",
    description: "Learn 5 new technologies",
    progress: 60,
    completed: 3,
    total: 5,
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    icon: Cpu,
  },
  {
    id: 8,
    name: "Collaboration Expert",
    category: "Teamwork",
    description: "Participate in 20 team projects",
    progress: 75,
    completed: 15,
    total: 20,
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    icon: Users,
  },
  {
    id: 9,
    name: "Goal Achiever",
    category: "Personal Growth",
    description: "Complete all personal learning goals",
    progress: 40,
    completed: 2,
    total: 5,
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: Target,
  },
]

const certificates = [
  {
    id: 1,
    name: "Advanced Team Collaboration",
    category: "Teamwork",
    description: "Certified in advanced team collaboration techniques and methodologies",
    issuedDate: "February 10, 2025",
    expiryDate: "February 10, 2027",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Users,
  },
  {
    id: 2,
    name: "Technical Leadership",
    category: "Leadership",
    description: "Recognized for exceptional technical leadership skills",
    issuedDate: "January 5, 2025",
    expiryDate: null,
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    icon: Rocket,
  },
  {
    id: 3,
    name: "Problem-Solving Excellence",
    category: "Skills",
    description: "Certified in advanced problem-solving methodologies",
    issuedDate: "March 20, 2025",
    expiryDate: "March 20, 2027",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    icon: CheckCircle,
  },
  {
    id: 4,
    name: "Innovation and Creativity",
    category: "Creativity",
    description: "Recognized for innovative thinking and creative solutions",
    issuedDate: "December 15, 2024",
    expiryDate: null,
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: Lightbulb,
  },
]

const availableCertificates = [
  {
    id: 5,
    name: "Advanced Data Analysis",
    category: "Technical",
    description: "Master advanced data analysis techniques and methodologies",
    requirements: [
      "Complete 3 data analysis projects",
      "Pass the final assessment with 80% or higher",
      "Submit a capstone project",
    ],
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    icon: Cpu,
  },
  {
    id: 6,
    name: "Team Management",
    category: "Leadership",
    description: "Learn effective team management strategies and leadership skills",
    requirements: [
      "Lead at least 2 team projects",
      "Complete the leadership course series",
      "Receive positive peer reviews",
    ],
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    icon: Users,
  },
]

const skillProgress = [
  {
    id: 1,
    name: "Technical Skills",
    level: "Advanced",
    points: 750,
    maxPoints: 1000,
    icon: Code,
  },
  {
    id: 2,
    name: "Collaboration",
    level: "Expert",
    points: 900,
    maxPoints: 1000,
    icon: Users,
  },
  {
    id: 3,
    name: "Problem Solving",
    level: "Intermediate",
    points: 600,
    maxPoints: 1000,
    icon: Brain,
  },
  {
    id: 4,
    name: "Leadership",
    level: "Advanced",
    points: 800,
    maxPoints: 1000,
    icon: Target,
  },
  {
    id: 5,
    name: "Innovation",
    level: "Intermediate",
    points: 550,
    maxPoints: 1000,
    icon: Lightbulb,
  },
]

const pointActivities = [
  {
    id: 1,
    activity: "Completed Team Challenge",
    points: "+50",
    date: "March 27, 2025",
    icon: Trophy,
  },
  {
    id: 2,
    activity: "Quiz Perfect Score",
    points: "+30",
    date: "March 25, 2025",
    icon: Star,
  },
  {
    id: 3,
    activity: "Helped Team Member",
    points: "+15",
    date: "March 23, 2025",
    icon: Users,
  },
  {
    id: 4,
    activity: "Submitted Project",
    points: "+40",
    date: "March 20, 2025",
    icon: CheckCircle,
  },
  {
    id: 5,
    activity: "Daily Login Streak",
    points: "+5",
    date: "March 19, 2025",
    icon: Zap,
  },
]

const teamAchievements = [
  {
    id: 1,
    name: "Project Excellence",
    description: "Team completed 5 projects with exceptional quality",
    date: "March 15, 2025",
    members: 5,
    points: 200,
    icon: Trophy,
  },
  {
    id: 2,
    name: "Collaboration Champions",
    description: "Highest collaboration score among all teams",
    date: "February 28, 2025",
    members: 5,
    points: 150,
    icon: Users,
  },
  {
    id: 3,
    name: "Innovation Award",
    description: "Most innovative solution in the quarterly challenge",
    date: "January 20, 2025",
    members: 5,
    points: 180,
    icon: Lightbulb,
  },
  {
    id: 4,
    name: "Perfect Attendance",
    description: "100% attendance in all team meetings for 3 months",
    date: "March 10, 2025",
    members: 5,
    points: 100,
    icon: CheckCircle,
  },
]

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("badges")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading achievements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Achievement Showcase</h1>
          <p className="text-muted-foreground">Track your progress and showcase your accomplishments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Achievement Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
                <Award className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Total Badges</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
                <Star className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">1,250</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
                <Medal className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Special Awards</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="badges">
            <Award className="mr-2 h-4 w-4" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="certificates">
            <Trophy className="mr-2 h-4 w-4" />
            Certificates
          </TabsTrigger>
          <TabsTrigger value="progress">
            <Star className="mr-2 h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2 h-4 w-4" />
            Team Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-6">
          <BadgesTab />
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <CertificatesTab />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <ProgressTab />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <TeamAchievementsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BadgesTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${badge.bgColor}`}>
                    <badge.icon className={`h-6 w-6 ${badge.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle>{badge.name}</CardTitle>
                    <CardDescription>{badge.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Earned on {badge.earnedDate}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Share className="mr-2 h-4 w-4" />
                  Share Badge
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Badges In Progress</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {badgesInProgress.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${badge.bgColor}`}>
                      <badge.icon className={`h-6 w-6 ${badge.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle>{badge.name}</CardTitle>
                      <CardDescription>{badge.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{badge.progress}% Complete</span>
                      <span className="text-sm text-muted-foreground">
                        {badge.completed}/{badge.total} tasks
                      </span>
                    </div>
                    <Progress value={badge.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue Progress</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CertificatesTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${certificate.bgColor}`}>
                    <certificate.icon className={`h-6 w-6 ${certificate.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle>{certificate.name}</CardTitle>
                    <CardDescription>{certificate.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center mb-4">
                  <Trophy className="h-12 w-12 text-muted-foreground opacity-20" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{certificate.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Issued on {certificate.issuedDate}</span>
                </div>
                {certificate.expiryDate && (
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Valid until {certificate.expiryDate}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button className="flex-1">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Certificates</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {availableCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${certificate.bgColor}`}>
                      <certificate.icon className={`h-6 w-6 ${certificate.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle>{certificate.name}</CardTitle>
                      <CardDescription>{certificate.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{certificate.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Requirements:</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-5 list-disc">
                      {certificate.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Certification</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgressTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Skill Progress</CardTitle>
          <CardDescription>Track your progress in different skill areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillProgress.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <skill.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{skill.level}</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.points}/{skill.maxPoints} points
                    </span>
                  </div>
                </div>
                <Progress value={(skill.points / skill.maxPoints) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Points History</CardTitle>
          <CardDescription>Your points earned over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Points history chart would render here</p>
              <p className="text-sm">Showing your progress over time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Point Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pointActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">{activity.points}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TeamAchievementsTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Team Achievements</CardTitle>
          <CardDescription>Accomplishments earned together with your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-4 border rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <achievement.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="text-lg font-bold text-primary">+{achievement.points}</div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {achievement.date}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {achievement.members} members
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Leaderboard</CardTitle>
          <CardDescription>See how your team ranks against others</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((position) => (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + position * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  position === 3 ? "bg-primary/10 border-2 border-primary" : "bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                    {position}
                  </div>
                  <div>
                    <p className="font-medium">
                      {position === 3
                        ? "Your Team"
                        : `Team ${position === 3 ? "Alpha" : ["Omega", "Delta", "Beta", "Gamma"][position - 1]}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {position === 3 ? "5 members" : `${4 + (position % 2)} members`}
                    </p>
                  </div>
                </div>
                <div className="text-lg font-bold">
                  {position === 1
                    ? "1,250"
                    : position === 2
                      ? "1,120"
                      : position === 3
                        ? "980"
                        : position === 4
                          ? "850"
                          : "720"}{" "}
                  pts
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Team Challenges</CardTitle>
          <CardDescription>Opportunities to earn more team achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Quarterly Innovation Challenge",
                description: "Develop an innovative solution for a real-world problem",
                deadline: "April 15, 2025",
                reward: "200 points",
              },
              {
                title: "Team Coding Marathon",
                description: "Complete a series of coding challenges as a team",
                deadline: "April 5, 2025",
                reward: "150 points",
              },
              {
                title: "Collaborative Project",
                description: "Work together to build a complete project from scratch",
                deadline: "April 30, 2025",
                reward: "250 points",
              },
            ].map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due: {challenge.deadline}
                      </div>
                      <div className="flex items-center">
                        <Trophy className="h-3 w-3 mr-1" />
                        Reward: {challenge.reward}
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

