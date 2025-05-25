"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { ShareIdeaModal } from "@/components/share-idea-modal"
import { cn } from "@/lib/utils"

export function FloatingActionButton() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 200
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    // Initial checks
    handleResize()
    handleScroll()

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  if (!isMobile) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300",
        scrolled ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
      )}
    >
      <ShareIdeaModal>
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-green-600 hover:bg-green-700 h-14 w-14 p-0 animate-bounce-slow"
          aria-label="Share your sustainability idea"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </ShareIdeaModal>
    </div>
  )
}
