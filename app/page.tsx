'use client'

import { Download, Smartphone, Music, FileText, Globe, Lock, Share2, Github, Mail } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isWindows, setIsWindows] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isWin = userAgent.includes('win')
    const isMob = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    
    setIsWindows(isWin && !isMob)
    setIsMobile(isMob)
  }, [])

  const handleDownload = () => {
    if (isMobile) {
      const userAgent = navigator.userAgent.toLowerCase()
      if (userAgent.includes('android')) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.tmatewe.notez'
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        alert('Zink AI Minutes is not yet available on iOS. Please check back soon!')
      }
    } else {
      window.location.href = 'https://firebasestorage.googleapis.com/v0/b/novo-freedom-app.firebasestorage.app/o/downloads%2FZinkSetup.exe?alt=media&token=ca78ed79-a285-410c-87fc-dca306095966'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Zink Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg text-dark hidden sm:inline">Zink AI Minutes</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:solutionsthm@gmail.com?subject=Zink%20AI%20Minutes%20Support" className="text-dark hover:text-primary transition font-medium flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </a>
            <button
              onClick={handleDownload}
              className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Download
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-dark mb-6 leading-tight">
          Meeting Minutes, Made Easy.
        </h1>
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
          The only AI note-taker that handles mixed English & Shona conversations. Available on your desktop and in your pocket.
        </p>

        {/* App Icon or Device Mockup */}
        <div className="mb-16 flex justify-center">
          <div className="relative w-80 h-80">
            <Image
              src="/App_Mockup.png"
              alt="Zink App Mockup"
              width={320}
              height={320}
              className="rounded-3xl shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Download Buttons */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          {/* Windows Button */}
          <a
            href="https://firebasestorage.googleapis.com/v0/b/novo-freedom-app.firebasestorage.app/o/downloads%2FZinkSetup.exe?alt=media&token=ca78ed79-a285-410c-87fc-dca306095966"
            className="bg-primary text-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition duration-300 transform hover:scale-105 flex flex-col items-center space-y-3"
          >
            <Image
              src="/icons8-windows-11-50.png"
              alt="Windows"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="font-bold text-lg">Download for Windows</div>
            <div className="text-sm opacity-90">v1.2.6</div>
          </a>

          {/* Android Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.tmatewe.notez"
            className="bg-black text-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition duration-300 transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <Image
              src="/GetItOnGooglePlay_Badge_Web_color_English.png"
              alt="Get it on Google Play"
              width={200}
              height={60}
              className="w-full"
            />
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-dark mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-3">Cross-Platform Sync</h3>
              <p className="text-gray-700">Record on your phone, edit on your PC. Your notes stay in perfect sync across all your devices.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <Music className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-3">Bilingual AI</h3>
              <p className="text-gray-700">Switch languages mid-sentence without confusing the AI. Zink understands mixed English & Shona seamlessly.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-3">Instant Export</h3>
              <p className="text-gray-700">PDF and Word exports in one click. Share polished meeting notes with your team instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-primary">Legal</h4>
              <ul className="space-y-2">
                <li><a href="https://docs.google.com/document/d/1yf50AVZGWgtp-dufK00vpzGBEifsPNcqSS13hkDw9p0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Privacy Policy</a></li>
                <li><a href="https://docs.google.com/document/d/1Og14ang4My-OQxLoHV7D86u97Bj5USc8mpxlRcxEQK4/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Connect</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com/tadiwa-dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a></li>
                <li><a href="mailto:solutionsthm@gmail.com?subject=Zink%20AI%20Minutes%20Support" className="hover:text-primary transition flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Support</span>
                </a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Zink AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
