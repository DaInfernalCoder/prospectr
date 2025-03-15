'use client'

import Image from "next/image";
import { RainbowButton } from "./ui/rainbow-button";
import { Splite } from "./ui/splite";
import { Play } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import TestimonialsAvatars from "./TestimonialsAvatars";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Hero = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true); // Default to mobile-first (SSR)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isSplineVisible, setIsSplineVisible] = useState(false);

  // Detect if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Consider mobile if less than md breakpoint
    };

    // Check on mount
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle Spline load event with a slight delay for smooth transition
  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
    
    // Add a small delay before showing the Spline animation
    // This ensures the animation is fully ready to display
    setTimeout(() => {
      setIsSplineVisible(true);
    }, 500);
  };

  const handleStartFinding = () => {
    router.push('/dashboard');
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-black to-base-100 pt-16 md:pt-20 lg:pt-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-500/10 rounded-full blur-3xl transform -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5 sm:gap-7 lg:gap-8 pb-8 sm:pb-10 lg:pb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-500/10 text-red-500 font-medium self-start animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              B2B SaaS Founders: Stop Wasting Time
            </div>
            
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
              <span className="text-white">10x Your LinkedIn</span>{' '}
              <span className="inline-block min-w-[180px] sm:min-w-[220px] md:min-w-[280px] lg:min-w-[320px]">
                <TypeAnimation
                  sequence={[
                    'Outreach',
                    2000,
                    'Connections',
                    2000,
                    'Sales Leads', 
                    2000, 
                    'Revenue',
                    2000,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                  className="inline-block text-transparent bg-clip-text bg-gradient bg-[length:300%_auto] animate-rainbow"
                  style={{ 
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                  }}
                />
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
              <span className="font-semibold text-white">Prospectr</span> is your AI-powered LinkedIn assistant that finds targeted leads, 
              sends personalized messages, and converts connections into customers—without the 
              <span className="line-through px-1">hours of manual work</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <RainbowButton 
                onClick={handleStartFinding}
                className="text-base sm:text-lg font-semibold px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto hover:scale-105 transition-transform ease-in-out shadow-lg shadow-red-500/20"
              >
                Start Finding Leads
              </RainbowButton>
              
              <a 
                href="#features" 
                className="text-base sm:text-lg font-medium text-white/80 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                See how it works
              </a>
            </div>

            <div className="mt-4 sm:mt-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-black"></div>
                  ))}
                </div>
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-white">120+</span> founders growing their businesses with Prospectr
                </p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] md:h-[500px] lg:h-[650px] relative mt-2 sm:mt-4 lg:mt-8">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/5 to-transparent"></div>
            
            {isMobile ? (
              // Static image for mobile
              <div className="relative w-full h-full">
                <Image
                  src="/images/prospectr-3d-static.webp"
                  alt="3D visualization"
                  fill
                  priority
                  className="object-contain scale-110 sm:scale-125"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  aria-hidden="true"
                  role="presentation"
                />
              </div>
            ) : (
              // Desktop: Show static image while Spline loads, then transition to Spline
              <>
                <div 
                  className={`absolute inset-0 z-10 transition-opacity duration-700 ${isSplineVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <Image
                    src="/images/prospectr-3d-static.webp"
                    alt="3D visualization"
                    fill
                    priority
                    className="object-contain scale-110 sm:scale-125"
                    sizes="(min-width: 768px) 50vw"
                    aria-hidden="true"
                    role="presentation"
                  />
                </div>
                <div className={`w-full h-full transition-opacity duration-700 ${isSplineVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <Splite 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                    className="w-full h-full scale-110 sm:scale-125 lg:scale-140"
                    onLoad={handleSplineLoad}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
