import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Bell,
  Home,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Package,
  Search,
  Settings,
  Users,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </form>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-12 items-center gap-2 px-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <nav className="grid gap-1 px-2 text-sm font-medium">
              <Button variant="ghost" className="justify-start gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button variant="secondary" className="justify-start gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Users className="h-4 w-4" />
                Users
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Package className="h-4 w-4" />
                Products
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button size="sm" className="ml-auto">
                Create New
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                    Chart placeholder
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                      <div className="flex items-center" key={i}>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36&text=User${i}`} alt="Avatar" />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">User {i}</p>
                          <p className="text-sm text-muted-foreground">user{i}@example.com</p>
                        </div>
                        <div className="ml-auto font-medium">+${(Math.random() * 1000).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

