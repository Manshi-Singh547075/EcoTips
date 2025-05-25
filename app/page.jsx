import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { ShareIdeaModal } from "@/components/share-idea-modal"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold">EcoTips</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/browse" className="text-sm font-medium transition-colors hover:text-primary">
              Browse Tips
            </Link>
            <Link href="/contribute" className="text-sm font-medium transition-colors hover:text-primary">
              Contribute
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Join Now
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/leaves-pattern.png')] bg-repeat opacity-5"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Small Changes, Big Impact
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join our community sharing daily and weekly sustainability tips to help create a greener future
                    together.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-600 hover:bg-green-700 animate-pulse-slow">Discover Tips</Button>
                  <ShareIdeaModal variant="outline">Share Your Idea</ShareIdeaModal>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 -left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative rounded-lg border bg-card p-8 shadow-lg transform transition-all duration-500 hover:scale-105">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Tip of the Day</h3>
                        <p className="text-sm text-muted-foreground">April 22, 2025</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg">
                        "Replace single-use plastic bottles with a reusable water bottle. This simple switch can prevent
                        hundreds of plastic bottles from entering landfills each year."
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>128</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>24</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-[url('/images/leaves-pattern.png')] bg-repeat opacity-5"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/30 dark:text-green-300">
                  Featured Tips
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  This Week's Sustainability Ideas
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover practical ways to make your daily routine more eco-friendly
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {tips.map((tip, index) => (
                <Card
                  key={index}
                  className="h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full p-1 ${tip.categoryColor}`}>{tip.icon}</div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                    <CardDescription>
                      {tip.author} • {tip.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{tip.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{tip.likes}</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="gap-1">
                View All Tips
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/leaves-pattern.png')] bg-repeat opacity-10"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/30 dark:text-green-300">
                  Contribute
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Share Your Sustainability Tips
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have a great idea for living more sustainably? Share it with our community and help others make a
                  positive impact.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <ShareIdeaModal className="bg-green-600 hover:bg-green-700">Submit Your Tip</ShareIdeaModal>
                  <Button variant="outline">Learn How It Works</Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex lg:justify-end">
                <div className="rounded-lg border bg-card p-6 shadow-lg max-w-md transform transition-all duration-500 hover:shadow-xl">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Community Highlights</h3>
                      <p className="text-sm text-muted-foreground">See what our community members are sharing</p>
                    </div>
                    <div className="space-y-4">
                      {communityTips.map((tip, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 rounded-lg border p-3 transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-950/20"
                        >
                          <div className="rounded-full bg-primary/10 p-2">
                            <Leaf className="h-4 w-4 text-primary" />
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">{tip.content}</p>
                            <p className="text-xs text-muted-foreground">
                              {tip.author} • {tip.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold">EcoTips</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 EcoTips. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const tips = [
  {
    title: "Zero-Waste Kitchen",
    author: "Emma Johnson",
    date: "2 days ago",
    content:
      "Store produce properly to extend its life. Keep fruits and vegetables separate, as many fruits release ethylene gas that can cause vegetables to spoil faster.",
    likes: 86,
    categoryColor: "bg-green-100",
    icon: <Leaf className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Sustainable Transport",
    author: "Michael Chen",
    date: "4 days ago",
    content:
      "Try carpooling with colleagues or neighbors for your daily commute. You'll save on fuel costs while reducing your carbon footprint.",
    likes: 64,
    categoryColor: "bg-blue-100",
    icon: <Leaf className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Energy Conservation",
    author: "Sophia Rodriguez",
    date: "1 week ago",
    content:
      "Unplug electronics when not in use. Even when turned off, many devices continue to draw power in standby mode.",
    likes: 112,
    categoryColor: "bg-yellow-100",
    icon: <Leaf className="h-4 w-4 text-yellow-600" />,
  },
]

const communityTips = [
  {
    content: "I started composting kitchen scraps and reduced my household waste by 40%!",
    author: "Jamie T.",
    date: "Yesterday",
  },
  {
    content: "Try making your own cleaning products with vinegar, baking soda, and essential oils.",
    author: "Priya K.",
    date: "3 days ago",
  },
  {
    content: "I installed a rain barrel to collect water for my garden and saved on my water bill.",
    author: "Marcus L.",
    date: "1 week ago",
  },
]
