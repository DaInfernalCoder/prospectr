"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: "Smart Lead Discovery",
    description:
      "Our AI-powered search algorithm identifies your ideal customers with precision targeting. Filter by industry, role, company size, funding stage, and more to find prospects that perfectly match your ICP.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
    stats: [
      { label: "Lead Quality", value: "95%" },
      { label: "Time Saved", value: "6h/day" }
    ]
  },
  {
    title: "Multi-touch Campaigns",
    description:
      "Create sophisticated outreach sequences that send personalized connection requests and follow-up messages on autopilot. Our smart sending algorithm stays within LinkedIn's limits while maximizing response rates.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    ),
    stats: [
      { label: "Avg. Response Rate", value: "43%" },
      { label: "Conversion Lift", value: "+187%" }
    ]
  },
  {
    title: "Sales Pipeline Management",
    description:
      "A complete CRM for your LinkedIn leads. Track connection status, conversation history, and lead stages. Set follow-up reminders and export qualified leads to your existing sales stack with one click.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    stats: [
      { label: "Pipeline Visibility", value: "100%" },
      { label: "Close Rate", value: "+68%" }
    ]
  },
  {
    title: "AI-Powered Analytics",
    description:
      "Get actionable insights with our advanced analytics dashboard. Track connection acceptance rates, response rates, and conversation outcomes. Optimize your messaging with A/B testing and see what resonates with your audience.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    stats: [
      { label: "Data Points", value: "60+" },
      { label: "Revenue Insights", value: "Real-time" }
    ]
  },
];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({ feature, isOpen, setFeatureSelected }) => {
  const accordion = useRef(null);
  const { title, description, svg, stats } = feature;

  return (
    <li className="group border-b border-zinc-800 last:border-0">
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg transition-all duration-300"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-300 transform p-2 rounded-lg ${isOpen ? "text-white bg-red-500" : "text-white/80 bg-zinc-800 group-hover:text-white group-hover:bg-red-500/30"}`}>
          {svg}
        </span>
        <span
          className={`flex-1 transition-all duration-300 ml-2 ${
            isOpen ? "text-red-500 font-bold translate-x-2" : "text-white/90 group-hover:text-red-400"
          }`}
        >
          <h3 className="inline text-lg md:text-xl">{title}</h3>
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-45 text-red-500" : "text-white/60"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-500 ease-in-out text-white/70 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-6 pl-12 pr-4 space-y-4">
          <p className="leading-relaxed">{description}</p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-zinc-800/50 rounded-lg p-4 backdrop-blur-sm border border-zinc-700/30 hover:border-red-500/30 transition-colors group/stat"
              >
                <div className="text-2xl font-bold text-red-500 group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }) => {
  const { type, path, format, alt } = feature;
  const style = "rounded-2xl aspect-square w-full sm:w-[26rem]";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return (
      <div className={`${style} bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-center`}>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full">
            {feature.svg && <span className="text-red-500 w-12 h-12">{feature.svg}</span>}
          </div>
          <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
          <p className="text-white/60 text-sm">{feature.stats?.[0]?.value} {feature.stats?.[0]?.label}</p>
        </div>
      </div>
    );
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <section
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-black relative overflow-hidden"
      id="features"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-red-500/20 to-transparent rounded-full blur-3xl transform rotate-12 opacity-30"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-red-500/20 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-30"></div>
      </div>

      <div className="px-8 relative">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-500/10 text-red-500 font-medium mb-6">
            Powerful Features
          </span>
          
          <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-8 text-white">
            Everything you need to
            <div className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
                dominate LinkedIn
              </span>
              <div className="absolute inset-0 bg-zinc-800 transform -skew-x-12"></div>
            </div>
          </h2>
          <p className="text-white/60 max-w-2xl text-lg">
            Our AI-powered platform automates your entire LinkedIn outreach workflow, from lead discovery to conversion tracking
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-6">
              <ul className="w-full divide-y divide-zinc-800">
                {features.map((feature, i) => (
                  <Item
                    key={feature.title}
                    index={i}
                    feature={feature}
                    isOpen={featureSelected === i}
                    setFeatureSelected={() => setFeatureSelected(i)}
                  />
                ))}
              </ul>
            </div>

            <div className="hidden lg:block">
              <Media feature={features[featureSelected]} key={featureSelected} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
