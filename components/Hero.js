import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import { RainbowButton } from "./ui/rainbow-button";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        

        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Find and Connect with Your Ideal LinkedIn Leads
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Automate your LinkedIn prospecting with AI-powered lead search, smart campaigns, 
          and automated connection requests. Find the right leads in minutes, not hours.
        </p>
        <RainbowButton>
          Start Finding Leads
        </RainbowButton>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src="/dashboard-preview.png"
          alt="Prospectr Dashboard Preview"
          className="w-full rounded-xl shadow-2xl"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
