const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "www.linkedin.com",
      "unsplash.com",
    ],
  },
  // Configure ESLint to not fail builds on warnings
  eslint: {
    // Warning during builds, but not failing
    ignoreDuringBuilds: true,
  },
  // Exclude Supabase Edge Functions from webpack compilation
  webpack: (config) => {
    // Add the supabase functions directory to ignored modules
    config.watchOptions = config.watchOptions || {};
    config.watchOptions.ignored = config.watchOptions.ignored || [];
    
    if (Array.isArray(config.watchOptions.ignored)) {
      config.watchOptions.ignored.push('**/supabase/functions/**');
    } else {
      config.watchOptions.ignored = ['**/supabase/functions/**'];
    }
    
    return config;
  },
  // Enable Turbopack for development
  experimental: {
    // Enable Turbopack
    turbo: {},
  },
};

module.exports = nextConfig;
