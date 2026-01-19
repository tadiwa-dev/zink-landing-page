'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

interface FrameCache {
  [key: number]: HTMLImageElement
}

const PhoneScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameCache = useRef<FrameCache>({})
  const animationFrameId = useRef<number | null>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Map scroll progress to frame number (1-80)
  const frameNumber = useTransform(scrollYProgress, [0, 1], [1, 80])

  // Frame path generator using padStart
  const getFramePath = (frameNum: number): string => {
    return `/PhoneKeyframes/ezgif-frame-${frameNum.toString().padStart(3, '0')}.jpg`
  }

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const promises: Promise<void>[] = []

      for (let i = 1; i <= 80; i++) {
        promises.push(
          new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              frameCache.current[i] = img
              resolve()
            }
            img.onerror = () => {
              console.warn(`Failed to load frame ${i}`)
              resolve()
            }
            img.src = getFramePath(i)
          })
        )
      }

      await Promise.all(promises)
      setIsLoaded(true)
    }

    preloadImages()
  }, [])

  // Draw to canvas - stretch to fill width
  const drawFrame = useCallback((frameNum: number) => {
    if (!canvasRef.current || !frameCache.current[frameNum]) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = frameCache.current[frameNum]

    // Clear canvas with the frame background color (white)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Stretch image to fill the full canvas width while maintaining aspect ratio
    const imgAspect = img.width / img.height
    
    // Draw width is the full canvas width
    const drawWidth = canvas.width
    // Calculate height to maintain aspect ratio
    const drawHeight = drawWidth / imgAspect
    
    // Center vertically
    const x = 0
    const y = (canvas.height - drawHeight) / 2

    // Draw the image stretched to full width
    ctx.drawImage(img, x, y, drawWidth, drawHeight)
  }, [])

  // Listen to frameNumber changes and update canvas
  useEffect(() => {
    if (!isLoaded) return

    const unsubscribe = frameNumber.on('change', (value: number) => {
      const frame = Math.round(value)
      setCurrentFrame(frame)

      // Cancel previous animation frame if pending
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }

      // Use requestAnimationFrame for smooth rendering
      animationFrameId.current = requestAnimationFrame(() => {
        drawFrame(frame)
      })
    })

    // Draw initial frame
    drawFrame(Math.round(frameNumber.get()))

    return () => {
      unsubscribe()
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isLoaded, frameNumber])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !stickyRef.current) return

      const dpr = window.devicePixelRatio || 1
      
      // Get the sticky container dimensions
      const rect = stickyRef.current.getBoundingClientRect()
      const width = rect.width || window.innerWidth
      const height = rect.height || window.innerHeight

      // Set canvas size with device pixel ratio for sharp rendering
      canvasRef.current.width = width * dpr
      canvasRef.current.height = height * dpr

      // Scale context to match device pixel ratio
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      // Redraw current frame after resize
      if (isLoaded) {
        setTimeout(() => {
          drawFrame(currentFrame)
        }, 0)
      }
    }

    // Initial setup
    if (isLoaded) {
      handleResize()
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isLoaded, currentFrame, drawFrame])

  // Text overlay animations - Create transforms at top level
  const opacity1 = useTransform(
    scrollYProgress,
    [Math.max(0, 0.1 - 0.1), 0.1, Math.min(1, 0.1 + 0.1)],
    [0, 1, 0]
  )
  const opacity2 = useTransform(
    scrollYProgress,
    [Math.max(0, 0.4 - 0.1), 0.4, Math.min(1, 0.4 + 0.1)],
    [0, 1, 0]
  )
  const opacity3 = useTransform(
    scrollYProgress,
    [Math.max(0, 0.7 - 0.1), 0.7, Math.min(1, 0.7 + 0.1)],
    [0, 1, 0]
  )
  const opacity4 = useTransform(
    scrollYProgress,
    [Math.max(0, 0.9 - 0.1), 0.9, Math.min(1, 0.9 + 0.1)],
    [0, 1, 0]
  )

  const TextOverlay = ({
    opacity,
    title,
    subtitle,
    position = 'left',
  }: {
    opacity: any
    title: string
    subtitle: string
    position?: 'left' | 'right' | 'bottom'
  }) => {
    const positionStyles = {
      left: 'left-10 md:left-20 top-1/3 -translate-y-1/2',
      right: 'right-10 md:right-20 top-1/3 -translate-y-1/2',
      bottom: 'bottom-20 md:bottom-32 left-1/2 -translate-x-1/2 text-center max-w-2xl',
    }

    return (
      <motion.div
        style={{ opacity }}
        className={`absolute ${positionStyles[position]} pointer-events-none`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark mb-2 md:mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-[400vh] w-full bg-white"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white">
        {/* Loading state */}
        {!isLoaded && (
          <div className="flex items-center justify-center h-full w-full">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl text-gray-500"
            >
              Loading Zink Experience...
            </motion.div>
          </div>
        )}

        {/* Canvas */}
        {isLoaded && (
          <>
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: 'block' }}
            />

            {/* Text overlays */}
            <div className="absolute inset-0 pointer-events-none">
              <TextOverlay
                opacity={opacity1}
                title="Record Anywhere"
                subtitle="Capture meetings in real-time on any device"
                position="left"
              />
              <TextOverlay
                opacity={opacity2}
                title="AI-Powered Transcription"
                subtitle="Bilingual English & Shona support for seamless conversations"
                position="right"
              />
              <TextOverlay
                opacity={opacity3}
                title="Instant Insights"
                subtitle="Automatic summaries and actionable notes in seconds"
                position="left"
              />
              <TextOverlay
                opacity={opacity4}
                title="Share with Your Team"
                subtitle="Export to PDF, Word, or share directly from the app"
                position="bottom"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PhoneScroll
