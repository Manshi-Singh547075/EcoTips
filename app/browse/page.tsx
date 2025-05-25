"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Leaf, Search, ThumbsUp, MessageSquare, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShareIdeaModal } from "@/components/share-idea-modal"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter tips based on search query and category
  const filteredTips = allTips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Sustainability Tips</h1>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Discover practical ideas to make your lifestyle more eco-friendly and sustainable.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for tips..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="waste">Waste Reduction</SelectItem>
                <SelectItem value="energy">Energy Conservation</SelectItem>
                <SelectItem value="water">Water Conservation</SelectItem>
                <SelectItem value="food">Sustainable Food</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTips.length > 0 ? (
                filteredTips.map((tip, index) => <TipCard key={index} tip={tip} />)
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">No tips found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </div>

            {filteredTips.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-1">
                  Load More
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
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="popular" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTips
                .sort((a, b) => b.likes - a.likes)
                .slice(0, 6)
                .map((tip, index) => (
                  <TipCard key={index} tip={tip} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTips
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 6)
                .map((tip, index) => (
                  <TipCard key={index} tip={tip} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="featured" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTips
                .filter((tip) => tip.featured)
                .map((tip, index) => (
                  <TipCard key={index} tip={tip} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Want to contribute?</h3>
              <p className="text-muted-foreground">Share your own sustainability tips with our community.</p>
            </div>
            <ShareIdeaModal className="bg-green-600 hover:bg-green-700">Submit Your Tip</ShareIdeaModal>
          </div>
        </div>
      </div>
    </div>
  )
}

function TipCard({ tip }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1 ${getCategoryColor(tip.category)}`}>
              <Leaf className="h-4 w-4 text-green-600" />
            </div>
            <Badge variant="outline" className="font-normal">
              {getCategoryName(tip.category)}
            </Badge>
          </div>
          {tip.featured && <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>}
        </div>
        <CardTitle className="text-lg mt-2">{tip.title}</CardTitle>
        <CardDescription>
          {tip.author} • {tip.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-4">{tip.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{tip.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 px-1">
            <MessageSquare className="h-4 w-4" />
            <span>{tip.comments}</span>
          </Button>
        </div>
        <Button variant="outline" size="sm">
          Read More
        </Button>
      </CardFooter>
    </Card>
  )
}

function getCategoryColor(category) {
  const colors = {
    waste: "bg-purple-100",
    energy: "bg-yellow-100",
    water: "bg-blue-100",
    food: "bg-green-100",
    transport: "bg-red-100",
    home: "bg-orange-100",
  }
  return colors[category] || "bg-gray-100"
}

function getCategoryName(category) {
  const names = {
    waste: "Waste Reduction",
    energy: "Energy Conservation",
    water: "Water Conservation",
    food: "Sustainable Food",
    transport: "Transportation",
    home: "Home & Garden",
  }
  return names[category] || "Other"
}

const allTips = [
  {
    title: "Zero-Waste Kitchen Hacks",
    author: "Emma Johnson",
    date: "May 10, 2025",
    content:
      "Store produce properly to extend its life. Keep fruits and vegetables separate, as many fruits release ethylene gas that can cause vegetables to spoil faster. Use beeswax wraps instead of plastic wrap for leftovers.",
    likes: 86,
    comments: 12,
    category: "waste",
    featured: true,
  },
  {
    title: "Sustainable Commuting",
    author: "Michael Chen",
    date: "May 8, 2025",
    content:
      "Try carpooling with colleagues or neighbors for your daily commute. You'll save on fuel costs while reducing your carbon footprint. For short distances, consider walking or cycling to improve your health while helping the environment.",
    likes: 64,
    comments: 8,
    category: "transport",
  },
  {
    title: "Energy-Saving Home Tips",
    author: "Sophia Rodriguez",
    date: "May 5, 2025",
    content:
      "Unplug electronics when not in use. Even when turned off, many devices continue to draw power in standby mode. This 'phantom energy' can account for up to 10% of your home's electricity use.",
    likes: 112,
    comments: 15,
    category: "energy",
    featured: true,
  },
  {
    title: "Water Conservation in the Bathroom",
    author: "James Wilson",
    date: "May 3, 2025",
    content:
      "Install a low-flow showerhead to reduce water usage by up to 40% without sacrificing water pressure. Also, fix leaky faucets promptly - a dripping tap can waste more than 3,000 gallons of water per year!",
    likes: 53,
    comments: 7,
    category: "water",
  },
  {
    title: "Seasonal Eating Guide",
    author: "Aisha Patel",
    date: "April 29, 2025",
    content:
      "Eating seasonally reduces the environmental impact of your food by minimizing transportation and storage needs. Spring vegetables like asparagus, peas, and spinach are at their peak flavor and nutritional value right now.",
    likes: 78,
    comments: 11,
    category: "food",
  },
  {
    title: "DIY Natural Cleaning Products",
    author: "Thomas Brown",
    date: "April 25, 2025",
    content:
      "Make your own all-purpose cleaner with vinegar, water, and essential oils. It's cheaper, healthier, and better for the environment than commercial cleaners that contain harsh chemicals and come in plastic packaging.",
    likes: 95,
    comments: 14,
    category: "home",
    featured: true,
  },
  {
    title: "Plastic-Free Shopping Tips",
    author: "Olivia Garcia",
    date: "April 22, 2025",
    content:
      "Bring your own reusable bags, produce bags, and containers when shopping. Many bulk food stores now allow customers to fill their own containers, eliminating packaging waste entirely.",
    likes: 102,
    comments: 18,
    category: "waste",
  },
  {
    title: "Smart Thermostat Benefits",
    author: "David Kim",
    date: "April 18, 2025",
    content:
      "Installing a smart thermostat can reduce your heating and cooling costs by 10-15%. These devices learn your schedule and preferences, adjusting temperatures automatically to save energy when you're away or asleep.",
    likes: 67,
    comments: 9,
    category: "energy",
  },
  {
    title: "Rainwater Harvesting Basics",
    author: "Leila Ahmed",
    date: "April 15, 2025",
    content:
      "Collect rainwater from your roof in barrels to use for watering plants and gardens. This reduces your water bill and prevents stormwater runoff, which can carry pollutants into local waterways.",
    likes: 59,
    comments: 7,
    category: "water",
    featured: true,
  },
]
