import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import { RainbowButton } from "./ui/rainbow-button";
import { Splite } from "./ui/splite";
import { Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-base-100">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left content */}
          <div className="w-full lg:w-[600px] flex flex-col gap-8">
            <div className="flex items-center gap-2 text-primary hover:text-primary/80">
              <Play className="w-4 h-4" />
              <a href="#" className="text-sm font-medium">Watch demo video</a>
            </div>
            
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight">
              Find and Connect with Your Ideal LinkedIn Leads
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Automate your LinkedIn prospecting with AI-powered lead search, smart campaigns, 
              and automated connection requests. Find the right leads in minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <RainbowButton>
                Start Finding Leads
              </RainbowButton>
            </div>

            <div className="mt-2">
              <TestimonialsAvatars priority={true} />
            </div>
          </div>

          {/* Right content */}
          <div className="w-full lg:w-[600px] h-[600px] lg:h-[700px]">
            <Splite scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
