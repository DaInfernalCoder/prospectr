'use client'

import { Play, Twitter } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

function SectionBiography() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-base-200/50 to-base-100">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Profile and Badge */}
          <div className="flex flex-col items-center space-y-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl"
            >
              <Image
                src="/founder-image.jpg"
                alt="Founder"
                className="object-cover"
                fill
                sizes="160px"
                priority
              />
            </motion.div>
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-500/10 text-red-500 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Building in Public
              </div>
              <a 
                href="https://x.com/ProspectrApp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
                @ProspectrApp
              </a>
            </div>
          </div>
          
          {/* Biography Content */}
          <div className="space-y-8 max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tighter text-white">
              hey! I&apos;m Sumit, the founder of <span className="text-red-500">Prospectr</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400">
              <p>
                As a <span className="text-white font-semibold">full-stack developer and entrepreneur</span>, 
                I was frustrated with the time-consuming process of finding leads on LinkedIn. 
                <span className="text-red-500 font-semibold"> I was spending 2+ hours daily</span> just searching 
                for potential clients.
              </p>
              <p>
                The existing tools were either <span className="text-white font-semibold">too expensive</span> ($200-$500/month) 
                or <span className="text-white font-semibold">too complex</span>. For someone bootstrapping a business, 
                these costs were just not justifiable.
              </p>
              <p>
                That&apos;s when I decided to build <span className="text-red-500 font-semibold">Prospectr</span> - 
                a simple yet powerful LinkedIn automation tool.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="w-full space-y-6">
            <p className="text-lg font-medium text-center text-gray-300">
              See how Prospectr can transform your LinkedIn outreach 👇
            </p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-xl overflow-hidden bg-base-300 shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
                  onClick={() => {
                    // Add video play logic here
                  }}
                >
                  <Play className="w-10 h-10" />
                </button>
              </div>
              <Image
                src="/demo-thumbnail.webp"
                alt="Prospectr Demo"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionBiography
