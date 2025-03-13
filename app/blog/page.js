import { categories, articles } from "./_assets/content";
import CardArticle from "./_assets/components/CardArticle";
import CardCategory from "./_assets/components/CardCategory";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `${config.appName} Blog | Lead Generation and Prospecting Tips`,
  description:
    "Learn about effective B2B prospecting, lead generation strategies, and how to grow your business with actionable insights and tips.",
  canonicalUrlRelative: "/blog",
});

export default async function Blog() {
  const articlesToDisplay = articles
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-6">
              Insights for Growth
            </h1>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              Expert strategies, tips, and insights to supercharge your B2B prospecting 
              and lead generation efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {articlesToDisplay.slice(0, 3).map((article, i) => (
            <CardArticle
              article={article}
              key={article.slug}
              isImagePriority={i === 0}
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Explore Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CardCategory key={category.slug} category={category} tag="div" />
            ))}
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">More Resources</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {articlesToDisplay.slice(3).map((article, i) => (
            <CardArticle
              article={article}
              key={article.slug}
              isImagePriority={false}
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-base-200 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-base-content/80 mb-8">
            Get the latest prospecting strategies and industry insights delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
