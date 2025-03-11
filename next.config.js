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
};

module.exports = nextConfig;
