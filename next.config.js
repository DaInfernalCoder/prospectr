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
  // Add headers for Open Graph images
  async headers() {
    return [
      {
        source: '/:all*(opengraph-image|twitter-image).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
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
