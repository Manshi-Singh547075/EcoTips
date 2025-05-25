"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ShareIdeaModal({ variant = "default", size = "default", className, children }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tip: "",
    name: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Quick idea submitted:", formData)

    // Show success toast
    toast({
      title: "Idea submitted!",
      description: "Thank you for sharing your sustainability tip.",
      duration: 5000,
    })

    // Reset form and show success state
    setSubmitted(true)

    // Close dialog after a delay
    setTimeout(() => {
      setOpen(false)
      // Reset for next time
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          title: "",
          category: "",
          tip: "",
          name: "",
        })
      }, 300)
    }, 2000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={variant} size={size} className={className}>
            <Sparkles className="mr-2 h-4 w-4" />
            Share Your Idea
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {submitted ? (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your sustainability tip has been submitted for review.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Share Your Sustainability Tip</DialogTitle>
              <DialogDescription>
                Have a quick idea for living more sustainably? Share it with our community!
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quick-title">Title</Label>
                  <Input
                    id="quick-title"
                    name="title"
                    placeholder="Give your tip a catchy title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quick-category">Category</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger id="quick-category">
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
                  <Label htmlFor="quick-tip">Your Tip</Label>
                  <Textarea
                    id="quick-tip"
                    name="tip"
                    placeholder="Share your sustainability tip or idea..."
                    className="min-h-[100px]"
                    required
                    value={formData.tip}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quick-name">Your Name</Label>
                  <Input
                    id="quick-name"
                    name="name"
                    placeholder="How you'd like to be credited"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Submit Tip
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
