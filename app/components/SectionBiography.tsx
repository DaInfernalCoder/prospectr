'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

function SectionBiography() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-base-200/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Biography Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Maker of the Year 2023
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hey, I&apos;m Marc 👋
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                I&apos;m an entrepreneur who ships fast and needs to make decisions fast too. 
                After building 24 startups in 2 years, I&apos;ve learned that data-driven decisions 
                are crucial for success.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                That&apos;s why I built DataFast - to help entrepreneurs like you:
              </p>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-lg">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Understand traffic without complexity
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Find growth opportunities in existing channels
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Make revenue-driven decisions quickly
                </li>
              </ul>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-base-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                onClick={() => {
                  // Add video play logic here
                }}
              >
                <Play className="w-8 h-8" />
              </button>
            </div>
            <Image
              src="/demo-thumbnail.webp"
              alt="Product Demo Thumbnail"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionBiography 