const Arrow = ({ extraStyle }) => {
  return (
    <svg
      className={`shrink-0 w-12 fill-blue-500/70 ${extraStyle}`}
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

const Step = ({ emoji, text, stats, color }) => {
  const colorClasses = {
    red: {
      bg: "bg-red-500/5",
      hoverBg: "hover:bg-red-500/10",
      border: "border-red-500/20",
      textColor: "text-red-400",
      boxBg: "bg-red-500/20",
    },
    blue: {
      bg: "bg-blue-500/5",
      hoverBg: "hover:bg-blue-500/10",
      border: "border-blue-500/20",
      textColor: "text-blue-400",
      boxBg: "bg-blue-500/20",
    },
    purple: {
      bg: "bg-purple-500/5",
      hoverBg: "hover:bg-purple-500/10",
      border: "border-purple-500/20",
      textColor: "text-purple-400",
      boxBg: "bg-purple-500/20",
    }
  };

  const colors = colorClasses[color] || colorClasses.red;

  return (
    <div className={`w-full md:w-48 flex flex-col gap-6 items-center justify-center p-6 ${colors.bg} ${colors.hoverBg} rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-opacity-30 ${colors.border}`}>
      <div className="relative">
        <span className="text-7xl mb-3 relative z-10">{emoji}</span>
        <div className={`absolute -inset-3 rounded-full blur-md opacity-30 ${colors.boxBg}`}></div>
      </div>
      <div className={`${colors.boxBg} px-6 py-4 rounded-full w-full text-center shadow-inner`}>
        <h3 className={`font-bold ${colors.textColor} text-xl tracking-tight`}>{text}</h3>
      </div>
      {stats && (
        <p className={`text-base text-white/90 font-medium border-t ${colors.border} pt-5 w-full text-center leading-relaxed`}>
          {stats}
        </p>
      )}
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
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-base-100 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="opacity-30 absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:38px_38px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-8 py-24 md:py-40 text-center relative z-10">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-8 py-4 text-base rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-400 font-medium mb-16 shadow-lg border border-red-500/10">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-lg font-bold tracking-wider uppercase">The SaaS Growth Bottleneck</span>
        </div>

        {/* Main Heading with BG Highlight */}
        <div className="relative mb-20 md:mb-28">
          <h2 className="max-w-4xl mx-auto font-extrabold text-5xl md:text-7xl tracking-tight text-white leading-tight">
            SaaS founders are <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 px-3">wasting $10K+ monthly</span> on lead generation that never converts
          </h2>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full"></div>
        </div>
        
        {/* Main Content with Better Visual Hierarchy */}
        <div className="max-w-3xl mx-auto mb-32">
          <h3 className="text-2xl font-bold text-white mb-10 opacity-80">The Hidden Cost of Traditional Marketing</h3>
          
          <div className="space-y-10">
            <p className="text-2xl text-gray-300 leading-relaxed">
              While your competitors connect directly with enterprise decision-makers, you&apos;re watching your limited runway 
              disappear into generic marketing channels.
            </p>
            
            {/* Key Stats Card */}
            <div className="bg-gradient-to-br from-red-900/20 to-purple-900/20 rounded-xl p-10 my-16 border border-red-500/20 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center justify-center gap-4 mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h4 className="text-2xl font-bold text-red-300 tracking-wide uppercase">The Hard Numbers</h4>
              </div>
              <p className="text-3xl text-white font-bold leading-relaxed">
                Every day without targeted B2B leads costs you 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400"> $330 in wasted spend </span>
                and delays your path to $1M ARR by weeks.
              </p>
            </div>
            
            <p className="text-2xl text-gray-300 leading-relaxed">
              Your product deserves to be in front of the right people — 
              <span className="italic text-white font-medium"> not buried on page 6 of Google.</span>
            </p>
          </div>
        </div>

        {/* 3-Step Process with Different Colors */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-white mb-16 opacity-80">Three Critical Problems Facing SaaS Founders</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-start gap-10 md:gap-14">
            <div className="flex flex-col items-center gap-8">
              <Step 
                emoji="💸" 
                text="SaaS Ad Failure" 
                stats="76% of B2B ads never reach decision-makers"
                color="red"
              />
              <Arrow extraStyle="hidden md:block -rotate-90 translate-y-8" />
            </div>
            
            <div className="flex flex-col items-center gap-8">
              <Step 
                emoji="⏳" 
                text="Content Marketing Lag" 
                stats="12-18 months to see ROI"
                color="blue"
              />
              <Arrow extraStyle="hidden md:block -rotate-90 -scale-x-100 translate-y-8" />
            </div>
            
            <div className="flex flex-col items-center gap-8">
              <Step 
                emoji="📉" 
                text="Runway Depletion" 
                stats="3-6 months of wasted spend before pivot"
                color="purple"
              />
            </div>
          </div>
        </div>

        {/* Call to Action with Strong Visual Hierarchy */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black py-16 px-8 rounded-2xl shadow-2xl border border-purple-500/10 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-500 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="flex flex-col items-center gap-10 relative z-10">
            <h3 className="text-2xl font-bold text-white opacity-80 uppercase tracking-wider">The Solution</h3>
            
            {/* CTA Icon */}
            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-1.5 rounded-full shadow-lg shadow-purple-900/40 transform hover:scale-110 transition-transform duration-300">
              <svg
                className="w-16 h-16 text-white p-3.5 bg-black rounded-full"
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
            </div>
            
            {/* CTA Heading */}
            <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Your path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-400">predictable SaaS revenue</span>
            </h3>
            
            {/* CTA Description */}
            <p className="text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10">
              Connect directly with enterprise buyers who have the 
              <span className="font-bold text-white"> budget, authority, and urgent need </span>
              for your solution
            </p>
            
            {/* Visual Separator */}
            <div className="flex items-center justify-center w-full gap-3 opacity-60">
              <div className="h-px bg-purple-500/30 w-20"></div>
              <div className="h-1.5 w-1.5 bg-purple-500 rounded-full"></div>
              <div className="h-px bg-purple-500/30 w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
