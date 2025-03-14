const Arrow = ({ extraStyle }) => {
  return (
    <svg
      className={`shrink-0 w-12 fill-red-500/70 ${extraStyle}`}
      viewBox="0 0 138 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z"
        />
      </g>
    </svg>
  );
};

const Step = ({ emoji, text }) => {
  return (
    <div className="w-full md:w-48 flex flex-col gap-4 items-center justify-center">
      <span className="text-5xl">{emoji}</span>
      <div className="bg-red-500/10 px-6 py-3 rounded-full">
        <h3 className="font-medium text-red-500">{text}</h3>
      </div>
    </div>
  );
};

// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Hero: "ShipFast helps developers launch startups fast"
// - Problem Agitation: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)
// - Features: "ShipFast has user auth, Stripe, emails all set up for you"
const Problem = () => {
  return (
    <section className="bg-gradient-to-b from-black to-base-100">
      <div className="max-w-4xl mx-auto px-8 py-16 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-500/10 text-red-500 font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          The Problem
        </div>

        <h2 className="max-w-3xl mx-auto font-bold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8 text-white">
          Traditional marketing is burning your cash with <span className="text-red-500">zero guarantees</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-lg text-gray-400 leading-relaxed mb-16 md:mb-24">
          Watching your budget disappear into ads that don&apos;t convert, waiting months for SEO to work, while your competitors race ahead... The clock is ticking on your runway.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-6 mb-20">
          <Step emoji="💸" text="Thousands wasted on ads" />
          <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />
          <Step emoji="⏳" text="12+ months for SEO results" />
          <Arrow extraStyle="md:-scale-x-100 md:-rotate-90" />
          <Step emoji="📉" text="Zero predictable revenue" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <p className="text-xl font-medium text-gray-400">
            There&apos;s a <span className="text-white">better way</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
