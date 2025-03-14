import Image from "next/image";
import authorImg from "@/app/blog/_assets/images/authors/author.png";

// Import blog post header images
import prospectingStrategiesImg from "@/public/blog/prospecting-strategies/header.jpg";
import linkedinTipsImg from "@/public/blog/linkedin-tips/header.jpg";
import emailOutreachImg from "@/public/blog/email-outreach/header.jpg";
import salesAutomationImg from "@/public/blog/sales-automation/header.jpg";

// ==================================================================================================================================================================
// BLOG CATEGORIES 🏷️
// ==================================================================================================================================================================

// These slugs are used to generate pages in the /blog/category/[categoryI].js. It's a way to group articles by category.
const categorySlugs = {
  strategy: "strategy",
  tutorial: "tutorial",
  insights: "insights",
  automation: "automation",
};

// All the blog categories data display in the /blog/category/[categoryI].js pages.
export const categories = [
  {
    // The slug to use in the URL, from the categorySlugs object above.
    slug: categorySlugs.strategy,
    // The title to display the category title (h1), the category badge, the category filter, and more. Less than 60 characters.
    title: "Prospecting Strategies",
    // A short version of the title above, display in small components like badges. 1 or 2 words
    titleShort: "Strategies",
    // The description of the category to display in the category page. Up to 160 characters.
    description:
      "Learn effective B2B prospecting strategies to identify and connect with your ideal customers.",
    // A short version of the description above, only displayed in the <Header /> on mobile. Up to 60 characters.
    descriptionShort: "Effective B2B prospecting strategies.",
  },
  {
    slug: categorySlugs.tutorial,
    title: "How-To Guides",
    titleShort: "Tutorials",
    description:
      "Step-by-step tutorials on using Prospectr and implementing successful prospecting techniques.",
    descriptionShort: "Learn how to prospect effectively with our guides.",
  },
  {
    slug: categorySlugs.insights,
    title: "Industry Insights",
    titleShort: "Insights",
    description:
      "Stay updated with the latest trends, best practices, and insights in B2B prospecting and lead generation.",
    descriptionShort: "Latest trends in B2B prospecting.",
  },
  {
    slug: categorySlugs.automation,
    title: "Sales Automation",
    titleShort: "Automation",
    description:
      "Discover how to automate your prospecting workflow and scale your outreach efforts efficiently.",
    descriptionShort: "Automate your prospecting workflow.",
  },
];

// ==================================================================================================================================================================
// BLOG AUTHORS 📝
// ==================================================================================================================================================================

// Social icons used in the author's bio.
const socialIcons = {
  twitter: {
    name: "Twitter",
    svg: (
      <svg
        version="1.1"
        id="svg5"
        x="0px"
        y="0px"
        viewBox="0 0 1668.56 1221.19"
        className="w-9 h-9"
        // Using a dark theme? ->  className="w-9 h-9 fill-white"
      >
        <g id="layer1" transform="translate(52.390088,-25.058597)">
          <path
            id="path1009"
            d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
          />
        </g>
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  github: {
    name: "GitHub",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
};

// These slugs are used to generate pages in the /blog/author/[authorId].js. It's a way to show all articles from an author.
const authorSlugs = {
  main: "prospectr-team",
};

// All the blog authors data display in the /blog/author/[authorId].js pages.
export const authors = [
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.main,
    // The name to display in the author's bio. Up to 60 characters.
    name: "Prospectr Team",
    // The job to display in the author's bio. Up to 60 characters.
    job: "B2B Prospecting Experts",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "The Prospectr team consists of experienced B2B sales professionals and growth experts who have helped thousands of businesses improve their prospecting and lead generation efforts.",
    // The avatar of the author to display in the author's bio and avatar badge. It's better to use a local image, but you can also use an external image (https://...)
    avatar: authorImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/prospectr",
      },
      {
        name: socialIcons.linkedin.name,
        icon: socialIcons.linkedin.svg,
        url: "https://www.linkedin.com/company/prospectr",
      },
    ],
  },
];

// ==================================================================================================================================================================
// BLOG ARTICLES 📚
// ==================================================================================================================================================================

// These styles are used in the content of the articles. When you update them, all articles will be updated.
const styles = {
  h2: "text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-base-content",
  h3: "text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content",
  p: "text-base-content/90 leading-relaxed mb-6",
  ul: "list-inside list-disc text-base-content/90 leading-relaxed mb-6",
  li: "list-item mb-2",
  // Altnernatively, you can use the library react-syntax-highlighter to display code snippets.
  code: "text-sm font-mono bg-neutral text-neutral-content p-6 rounded-box my-4 overflow-x-scroll select-all",
  codeInline:
    "text-sm font-mono bg-base-300 px-1 py-0.5 rounded-box select-all",
};

// All the blog articles data display in the /blog/[articleId].js pages.
export const articles = [
  {
    // The unique slug to use in the URL. It's also used to generate the canonical URL.
    slug: "effective-prospecting-strategies-2024",
    // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    title: "10 Effective B2B Prospecting Strategies for 2024",
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description:
      "Discover the most effective B2B prospecting strategies that will help you identify, connect with, and convert high-quality leads in 2024.",
    // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
    categories: [
      categories.find((category) => category.slug === categorySlugs.strategy),
    ],
    // The author of the article. It's used to generate a link to the author's bio page.
    author: authors.find((author) => author.slug === authorSlugs.main),
    // The date of the article. It's used to generate the meta date.
    publishedAt: "2024-03-13",
    image: {
      // The image to display in <CardArticle /> components.
      src: prospectingStrategiesImg,
      // The relative URL of the same image to use in the Open Graph meta tags & the Schema Markup JSON-LD.
      urlRelative: "/blog/prospecting-strategies/header.jpg",
      alt: "B2B Prospecting Strategies Illustration",
    },
    // The actual content of the article that will be shown under the <h1> title in the article page.
    content: (
      <>
        <Image
          src={prospectingStrategiesImg}
          alt="B2B Prospecting Strategies Illustration"
          width={700}
          height={500}
          priority={true}
          className="rounded-box mb-8"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>The Evolution of B2B Prospecting</h2>
          <p className={styles.p}>
            As we move further into 2024, B2B prospecting continues to evolve with new technologies, 
            changing buyer behaviors, and emerging best practices. This guide will help you stay ahead 
            of the curve with proven strategies that deliver results.
          </p>
        </section>

        <section>
          <h2 className={styles.h2}>Top 10 Prospecting Strategies</h2>
          
          <h3 className={styles.h3}>1. Data-Driven Prospect Identification</h3>
          <p className={styles.p}>
            Use advanced data analytics and AI to identify prospects that match your ideal customer profile. 
            Focus on companies showing buying signals and growth indicators.
          </p>

          <h3 className={styles.h3}>2. Multi-Channel Outreach</h3>
          <p className={styles.p}>
            Combine LinkedIn, email, and phone outreach in a coordinated sequence to increase response rates 
            and engagement.
          </p>

          <h3 className={styles.h3}>3. Personalized Value Propositions</h3>
          <p className={styles.p}>
            Craft tailored messages that address specific pain points and challenges of each prospect segment.
          </p>
        </section>
      </>
    ),
  },
  {
    slug: "linkedin-prospecting-tips",
    title: "LinkedIn Prospecting: A Complete Guide",
    description:
      "Master LinkedIn prospecting with our comprehensive guide. Learn how to find, connect with, and engage potential clients effectively.",
    categories: [
      categories.find((category) => category.slug === categorySlugs.tutorial),
    ],
    author: authors.find((author) => author.slug === authorSlugs.main),
    publishedAt: "2024-03-12",
    image: {
      src: linkedinTipsImg,
      urlRelative: "/blog/linkedin-tips/header.jpg",
      alt: "LinkedIn Prospecting Guide",
    },
    content: (
      <>
        <Image
          src={linkedinTipsImg}
          alt="LinkedIn Prospecting Guide"
          width={700}
          height={500}
          priority={true}
          className="rounded-box mb-8"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Why LinkedIn is Essential for B2B Prospecting</h2>
          <p className={styles.p}>
            LinkedIn has become the go-to platform for B2B prospecting, offering unparalleled access to 
            decision-makers and valuable business insights.
          </p>
        </section>
      </>
    ),
  },
  {
    slug: "email-outreach-best-practices",
    title: "Email Outreach Best Practices That Get Responses",
    description:
      "Learn how to craft compelling email sequences that engage prospects and drive responses. Includes templates and real-world examples.",
    categories: [
      categories.find((category) => category.slug === categorySlugs.strategy),
    ],
    author: authors.find((author) => author.slug === authorSlugs.main),
    publishedAt: "2024-03-11",
    image: {
      src: emailOutreachImg,
      urlRelative: "/blog/email-outreach/header.jpg",
      alt: "Email Outreach Strategies",
    },
    content: (
      <>
        <Image
          src={emailOutreachImg}
          alt="Email Outreach Strategies"
          width={700}
          height={500}
          priority={true}
          className="rounded-box mb-8"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>The Art of Email Prospecting</h2>
          <p className={styles.p}>
            Email remains one of the most effective channels for B2B prospecting when done right. 
            Learn how to cut through the noise and get responses.
          </p>
        </section>
      </>
    ),
  },
  {
    slug: "sales-automation-guide",
    title: "The Complete Guide to Sales Automation",
    description:
      "Discover how to automate your sales processes without losing the personal touch. Learn about tools, workflows, and best practices.",
    categories: [
      categories.find((category) => category.slug === categorySlugs.automation),
    ],
    author: authors.find((author) => author.slug === authorSlugs.main),
    publishedAt: "2024-03-10",
    image: {
      src: salesAutomationImg,
      urlRelative: "/blog/sales-automation/header.jpg",
      alt: "Sales Automation Guide",
    },
    content: (
      <>
        <Image
          src={salesAutomationImg}
          alt="Sales Automation Guide"
          width={700}
          height={500}
          priority={true}
          className="rounded-box mb-8"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Automating Your Sales Process</h2>
          <p className={styles.p}>
            Learn how to leverage automation to scale your prospecting efforts while maintaining 
            personalization and quality of engagement.
          </p>
        </section>
      </>
    ),
  },
];
