import Image from "next/image";
import CompanyLogo from "./CompanyLogo";

// A beautiful single testimonial with a user name and and company logo logo
const Testimonial = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-base-100 px-8 py-24 sm:py-32"
      id="featured-testimonial"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1/4 h-1/4 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="opacity-30 absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:38px_38px]"></div>
      </div>

      <div className="mx-auto max-w-2xl lg:max-w-5xl relative z-10">
        {/* Section Badge */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 px-8 py-4 text-base rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-400 font-medium shadow-lg border border-red-500/10">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-lg font-bold tracking-wider uppercase">
              Featured Testimonial
            </span>
          </div>
        </div>

        <figure className="mt-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* <div className="relative">
              Glow effect behind image
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 via-pink-500/30 to-purple-500/30 rounded-xl blur-md"></div>
              
              <div className="relative rounded-xl border border-base-content/5 bg-base-content/5 p-1.5 sm:-rotate-1 transform hover:rotate-0 transition-transform duration-300">
                <Image
                  width={320}
                  height={320}
                  className="rounded-lg max-w-[320px] md:max-w-[280px] lg:max-w-[320px] object-center border-2 border-white/10 shadow-md"
                  // Ideally, load from a statically generated image for better SEO performance
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                  alt="A testimonial from David Thompson, VP of Sales at TechGrowth"
                />
              </div>
            </div> */}

            <div className="bg-gradient-to-br from-red-900/10 to-purple-900/10 rounded-xl p-8 border border-red-500/10 shadow-xl w-full">
              <blockquote className="text-xl font-medium leading-8 text-white sm:text-2xl sm:leading-10 relative">
                <span className="absolute -top-6 -left-2 text-6xl text-red-500/20">
                  "
                </span>
                I was skeptical at first about automation tools for LinkedIn,
                but Prospectr is different. It&apos;s not just about mass
                messaging - it&apos;s about{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-400 font-bold">
                  smart targeting and personalized outreach at scale
                </span>
                . Our sales team has seen a{" "}
                <span className="font-bold text-white">
                  230% increase in qualified leads
                </span>{" "}
                since implementing Prospectr. The ROI has been exceptional.
                <span className="absolute -bottom-6 -right-2 text-6xl text-purple-500/20">
                  "
                </span>
              </blockquote>

              <div className="h-px w-full bg-gradient-to-r from-red-500/30 via-pink-500/30 to-purple-500/30 my-8"></div>

              <figcaption className="flex items-center justify-start gap-5">
                <div className="text-base">
                  <div className="font-semibold text-white mb-0.5">
                    David Thompson
                  </div>
                  <div className="text-gray-300">
                    VP of Sales, TechGrowth Inc.
                  </div>
                </div>

                {/* Using the CompanyLogo component */}
                <div className="bg-white/5 p-2 rounded-lg">
                  <CompanyLogo
                    name=""
                    width={100}
                    height={40}
                    className="w-24"
                  />
                </div>
              </figcaption>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Testimonial;
