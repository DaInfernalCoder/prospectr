'use client'

import Image from "next/image";
import { RainbowButton } from "./ui/rainbow-button";
import { Splite } from "./ui/splite";
import { Play } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import TestimonialsAvatars from "./TestimonialsAvatars";
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleStartFinding = () => {
    router.push('/dashboard');
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-base-100">
      <div className="max-w-[1300px] mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 pb-10 lg:pb-0">
            {/*<div className="flex items-center gap-2 text-primary hover:text-primary/80">
              <Play className="w-4 h-4" />
              <a href="#" className="text-sm font-medium">Watch demo video</a>
            </div> */}
            
            <h1 className="font-extrabold text-5xl lg:text-7xl tracking-tight">
              Find the right leads for {' '}
              <span className="inline-block pb-2">
                <TypeAnimation
                  sequence={[
                    2000,
                    'internships',
                    2000,
                    'recruiting',
                    2000,
                    'job hunting', 
                    2000, 
                    'sales',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="inline-block text-transparent bg-gradient bg-[length:300%_auto] animate-rainbow min-h-[1.2em]"
                />
              </span>
            </h1>
            <p className="text-lg lg:text-xl opacity-80 leading-relaxed max-w-2xl">
              Your personal AI powered LinkedIn assistant, allowing you to send messages and get new connections on autopilot
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              <RainbowButton 
                onClick={handleStartFinding}
                className="text-lg font-semibold px-8 py-4 w-full sm:w-auto hover:scale-105 transition-transform ease-in-out"
              >
                Start Finding Leads
              </RainbowButton>
            </div>

            <div className="mt-1">
              {/* <TestimonialsAvatars priority={true} /> */}
            </div>
          </div>

          {/* Right content */}
          <div className="w-full lg:w-1/2 h-[500px] md:h-[550px] lg:h-[650px] relative mt-6 lg:mt-16">
            <Splite scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full scale-125 lg:scale-140" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
