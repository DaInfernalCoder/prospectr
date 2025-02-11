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
    <section className="relative w-full overflow-hidden bg-base-100">
      <div className="max-w-[1200px] mx-auto px-2 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="w-full lg:w-[600px] flex flex-col gap-8">
            {/*<div className="flex items-center gap-2 text-primary hover:text-primary/80">
              <Play className="w-4 h-4" />
              <a href="#" className="text-sm font-medium">Watch demo video</a>
            </div> */}
            
            <h1 className="font-extrabold text-5xl lg:text-7xl tracking-tight">
              Find the right leads for {' '}
              <span className="inline-block">
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
                  className="inline-block text-transparent bg-clip-text bg-gradient bg-[length:200%_auto] animate-rainbow"
                />
              </span>
            </h1>
            <p className="text-xl opacity-80 leading-relaxed">
              Your personal AI powered LinkedIn assistant, built without the ridiculous price tag.
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
          <div className="w-full lg:w-[650px] h-[650px] lg:h-[750px] relative">
            <Splite scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full scale-110" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
