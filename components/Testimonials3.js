import Image from "next/image";
import config from "@/config";

// The list of your testimonials. It needs 3 items to fill the row.
const list = [
  {
    // Optional, use for social media like Twitter. Does not link anywhere but cool to display
    // username: "sarahsales",
    // REQUIRED
    name: "Sarah Johnson",
    // REQUIRED
    text: "Prospectr has revolutionized my LinkedIn outreach. I used to spend hours manually searching for leads, but now I can automate the entire process. My connection rate has improved by 45% in just one month!",
    // Optional, a statically imported image (usually from your public folder—recommended) or a link to the person's avatar. Shows a fallback letter if not provided
    // img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
  },
  {
    // username: "michaelb2b",
    name: "Michael Chen",
    text: "As a B2B sales consultant, finding the right prospects is everything. Prospectr's smart targeting features have helped me connect with decision-makers who are actually interested in my services. It's saved me countless hours of wasted outreach.",
    // img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    // username: "emilyceo",
    name: "Emily Rodriguez",
    text: "The personalized message templates in Prospectr are a game-changer. I'm getting 3x more responses because my outreach doesn't feel automated anymore. The analytics dashboard also helps me understand which strategies are working best.",
    // img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
];

// A single testimonial, to be rendered in a list
const Testimonial = ({ i }) => {
  const testimonial = list[i];

  if (!testimonial) return null;

  // Define color variations for each card
  const colorVariants = [
    "from-red-500/20 to-pink-500/20 border-red-500/20 shadow-red-500/10", // Red variant
    "from-pink-500/20 to-purple-500/20 border-purple-500/20 shadow-purple-500/10", // Purple variant
    "from-purple-500/20 to-blue-500/20 border-blue-500/20 shadow-blue-500/10", // Blue variant
  ];

  // Get the color variant for this testimonial
  const colorVariant = colorVariants[i % colorVariants.length];

  return (
    <li key={i} className="w-full">
      <figure
        className={`relative h-full p-6 md:p-8 bg-gradient-to-br rounded-2xl max-md:text-sm flex flex-col transform hover:scale-[1.02] transition-all duration-300 overflow-hidden group border border-opacity-30 shadow-lg ${colorVariant}`}
      >
        {/* Glow effect */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r ${colorVariant.split(" ")[0]} ${colorVariant.split(" ")[1]} opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300`}
        ></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="relative z-10">
          {/* Quote icon */}
          <div className="absolute top-2 right-2 text-4xl opacity-10 text-white">
            "
          </div>

          <blockquote className="relative flex-1">
            <p className="text-white leading-relaxed">
              {testimonial.text.split(" ").map((word, idx) => {
                // Highlight key metrics with gradient text
                if (
                  word.includes("45%") ||
                  word.includes("3x") ||
                  word.includes("countless")
                ) {
                  return (
                    <span
                      key={idx}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-400 font-bold"
                    >
                      {" "}
                      {word}{" "}
                    </span>
                  );
                }
                return <span key={idx}> {word}</span>;
              })}
            </p>
          </blockquote>

          <div className="h-px w-full bg-white/10 my-6"></div>

          <figcaption className="relative flex items-center justify-start gap-4 pt-2 md:gap-6">
            <div className="w-full flex items-center justify-between gap-2">
              <div>
                <div className="font-medium text-white md:mb-0.5">
                  {testimonial.name}
                </div>
                {/* {testimonial.username && (
                  <div className="mt-0.5 text-sm text-white/60">
                    @{testimonial.username}
                  </div>
                )} */}
              </div>

              {/* <div className="overflow-hidden rounded-full shrink-0 relative"> */}
              {/* Glow effect for avatar */}
              {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-full blur-sm opacity-70"></div> */}

              {/* <div className="relative">
                  {testimonial.img ? (
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-black"
                      src={list[i].img}
                      alt={`${list[i].name}'s testimonial for ${config.appName}`}
                      width={48}
                      height={48}
                    />
                  ) : (
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-lg font-medium bg-gradient-to-br from-red-500 to-purple-500 text-white">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div> */}
              {/* </div> */}
            </div>
          </figcaption>
        </div>
      </figure>
    </li>
  );
};

const Testimonials3 = () => {
  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-black via-gray-900 to-base-100 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-3xl transform -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
        <div className="opacity-30 absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:38px_38px]"></div>
      </div>

      <div className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col text-center w-full mb-20">
          {/* Section Badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-8 py-4 text-base rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-400 font-medium shadow-lg border border-red-500/10">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-lg font-bold tracking-wider uppercase">
                Success Stories
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="sm:text-5xl text-4xl font-extrabold text-white">
              Trusted by sales professionals{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-400">
                worldwide
              </span>
            </h2>
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-300">
            Don&apos;t take our word for it. See what our customers have to say
            about how Prospectr has transformed their LinkedIn prospecting.
          </p>
        </div>

        <ul
          role="list"
          className="flex flex-col items-center lg:flex-row lg:items-stretch gap-6 lg:gap-8"
        >
          {[...Array(3)].map((e, i) => (
            <Testimonial key={i} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials3;
