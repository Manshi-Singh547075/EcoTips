"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContributePage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tip: "",
    name: "",
    email: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center mb-12">
          <Leaf className="h-12 w-12 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Share Your Sustainability Tip</h1>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Help our community learn new ways to live more sustainably by sharing your knowledge and experiences.
          </p>
        </div>

        {submitted ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Thank You!</CardTitle>
              <CardDescription className="text-center">
                Your sustainability tip has been submitted for review.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-900 dark:text-green-400">
                <Leaf className="h-4 w-4" />
                <AlertTitle>Submission Received</AlertTitle>
                <AlertDescription>
                  Our team will review your tip and publish it soon. Thank you for contributing to a more sustainable
                  future!
                </AlertDescription>
              </Alert>
              <div className="mt-8 flex justify-center">
                <Button onClick={() => setSubmitted(false)} className="bg-green-600 hover:bg-green-700">
                  Submit Another Tip
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Contribute Your Tip</CardTitle>
              <CardDescription>
                Fill out the form below to share your sustainability tip with our community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Tip Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="E.g., 'Plastic-Free Shopping Tips'"
                      required
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={handleSelectChange} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waste-reduction">Waste Reduction</SelectItem>
                        <SelectItem value="energy">Energy Conservation</SelectItem>
                        <SelectItem value="water">Water Conservation</SelectItem>
                        <SelectItem value="food">Sustainable Food</SelectItem>
                        <SelectItem value="transport">Transportation</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="tip">Your Sustainability Tip</Label>
                    <Textarea
                      id="tip"
                      name="tip"
                      placeholder="Share your tip in detail. What is it? How do you do it? What impact does it have?"
                      className="min-h-[150px]"
                      required
                      value={formData.tip}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="How you'd like to be credited"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="For notification when published"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree that my tip may be shared publicly and I have the rights to any content I'm submitting.
                  </Label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Submit Tip
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quality Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Be specific and actionable</li>
                <li>Explain the environmental impact</li>
                <li>Include any cost savings if applicable</li>
                <li>Keep it concise and clear</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Review Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                All submissions are reviewed by our team for accuracy and helpfulness before being published. This
                typically takes 1-2 business days.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Get Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Exceptional tips may be featured on our homepage and social media channels, helping to spread
                sustainable practices to a wider audience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
