"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, FileText, ChevronRight, ChevronLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Video data
const videos = [
  {
    id: "video-1",
    title: "Getting Started with Sentinel",
    description: "Learn how to set up your first smart contract security scan",
    thumbnail: "/video_gettingstarted.png",
    duration: "5:24",
    category: "getting-started",
  },
  {
    id: "video-2",
    title: "Advanced Firewall Configuration",
    description: "Deep dive into customizing your smart contract firewall settings",
    thumbnail: "/video_firewall.png",
    duration: "12:07",
    category: "advanced",
  },
  {
    id: "video-3",
    title: "Understanding AI Audit Reports",
    description: "How to interpret and act on AI-generated security findings",
    thumbnail: "/video_aiaudits.jpeg",
    duration: "8:36",
    category: "getting-started",
  },
  {
    id: "video-4",
    title: "MEV Protection Strategies",
    description: "Protect your contracts from front-running and sandwich attacks",
    thumbnail: "/video_mev.png",
    duration: "15:42",
    category: "advanced",
  },
  {
    id: "video-5",
    title: "Self-Healing Contract Setup",
    description: "Configure automatic response protocols for your smart contracts",
    thumbnail: "/video_selfhealing.jpeg",
    duration: "10:18",
    category: "advanced",
  },
  {
    id: "video-6",
    title: "Compliance Automation Walkthrough",
    description: "Set up automated compliance checks for regulatory frameworks",
    thumbnail: "/video_complianceautomation.png",
    duration: "7:55",
    category: "compliance",
  },
  {
    id: "video-7",
    title: "Sentinel Dashboard Overview",
    description: "Navigate the Sentinel security dashboard like a pro",
    thumbnail: "/edux.png",
    duration: "4:30",
    category: "getting-started",
  },
  {
    id: "video-8",
    title: "Integrating with Development Workflow",
    description: "Add Sentinel security checks to your CI/CD pipeline",
    thumbnail: "/video_blockchainworkflow.jpeg",
    duration: "9:45",
    category: "integration",
  },
]

const categories = [
  { id: "all", name: "All Videos" },
  { id: "getting-started", name: "Getting Started" },
  { id: "advanced", name: "Advanced Features" },
  { id: "compliance", name: "Compliance" },
  { id: "integration", name: "Integration" },
]

export function VideoWalkthroughs() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [glitchActive, setGlitchActive] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Trigger occasional glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    return () => clearInterval(glitchInterval)
  }, [])

  const filteredVideos =
    selectedCategory === "all" ? videos : videos.filter((video) => video.category === selectedCategory)

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const scrollAmount = 350 // Approximate width of a video card + margin
    const currentScroll = carouselRef.current.scrollLeft

    carouselRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    })

    // Trigger glitch effect on scroll
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 200)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Random glitch lines */}
      {glitchActive && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-green-500 opacity-30"
              style={{
                height: `${Math.random() * 2}px`,
                width: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                left: 0,
                transform: `translateX(${Math.random() * 100}%)`,
                animation: `glitch-line ${Math.random() * 3 + 1}s infinite`,
              }}
            />
          ))}
        </>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
            <Play className="h-4 w-4 mr-2" />
            <span className="text-sm">Interactive Tutorials</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${glitchActive ? "animate-text-glitch" : ""}`}>
            <span className="text-green-400">{">"}</span> Video Walkthroughs
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-green-400">
            Learn how to maximize your security with our detailed video guides
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-green-600 text-black"
                  : "bg-green-950/30 border border-green-800 text-green-500 hover:bg-green-950/50"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-green-800 text-green-500 hover:bg-green-950/50 rounded-full h-10 w-10"
            onClick={() => scrollCarousel("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="min-w-[350px] snap-start mr-6 last:mr-0"
              >
                <div
                  className="bg-green-950/10 border border-green-900 rounded-lg overflow-hidden hover:border-green-500 transition-colors cursor-pointer group"
                  onClick={() => setActiveVideo(video.id)}
                >
                  <div className="relative">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      width={350}
                      height={200}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-green-500/80 flex items-center justify-center">
                        <Play className="h-8 w-8 text-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>

                    {/* Scan line effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="w-full h-px bg-green-500/20 absolute top-1/2 animate-scan"></div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{video.title}</h3>
                    <p className="text-green-400 text-sm mb-3">{video.description}</p>
                    <div className="flex items-center text-xs text-green-400">
                      <FileText className="h-3 w-3 mr-1" />
                      <span>{categories.find((c) => c.id === video.category)?.name || video.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-green-800 text-green-500 hover:bg-green-950/50 rounded-full h-10 w-10"
            onClick={() => scrollCarousel("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-black font-bold px-8 py-3">View All Videos</Button>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-green-950/20 border border-green-900 rounded-lg w-full max-w-4xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-green-900">
                <h3 className="font-bold text-lg">{videos.find((v) => v.id === activeVideo)?.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-green-950/50"
                  onClick={() => setActiveVideo(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="aspect-video bg-black relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-green-500 opacity-50" />
                  <p className="absolute text-sm text-green-400">Video would play here</p>
                </div>

                {/* Scan lines */}
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className="absolute w-full h-px bg-green-500/5" style={{ top: `${i * 10}px` }} />
                ))}
              </div>
              <div className="p-4">
                <p className="text-green-400">{videos.find((v) => v.id === activeVideo)?.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

