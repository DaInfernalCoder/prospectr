"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// <FAQ> component is a list of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

// FAQ categories with icons
const categories = [
  { name: "All", icon: "🔍" },
  { name: "Features", icon: "⚙️" },
  { name: "Compliance", icon: "✓" },
  { name: "Support", icon: "🛟" },
];

const faqList = [
  {
    question: "How does Prospectr work with LinkedIn's connection limits?",
    answer: (
      <p>
        Prospectr respects LinkedIn&apos;s daily connection limit of 50 requests per day. Our smart campaign scheduling ensures you stay within these limits while maximizing your outreach effectiveness.
      </p>
    ),
    category: "Features",
    icon: "📊",
  },
  {
    question: "Is this compliant with LinkedIn's terms of service?",
    answer: (
      <p>
        Yes! Prospectr uses LinkedIn&apos;s official API and follows all their guidelines. We maintain strict compliance to ensure your account&apos;s safety and good standing.
      </p>
    ),
    category: "Compliance",
    icon: "🔒",
  },
  {
    question: "Can I export my leads to other tools?",
    answer: (
      <p>
        Absolutely! You can export your leads to CSV format or directly integrate with popular CRM systems. This makes it easy to manage your leads across your entire sales stack.
      </p>
    ),
    category: "Features",
    icon: "📤",
  },
  {
    question: "How does the AI-powered search work?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Our AI analyzes your ideal customer profile and searches LinkedIn for matching prospects based on multiple factors including:
        <ul className="list-disc list-inside mt-2">
          <li>Job titles and roles</li>
          <li>Industry and company size</li>
          <li>Location and language</li>
          <li>Activity patterns and engagement</li>
        </ul>
      </div>
    ),
    category: "Features",
    icon: "🤖",
  },
  {
    question: "What kind of support do you offer?",
    answer: (
      <p>
        We provide email support 7 days a week. For our premium users, we also offer priority support and personalized campaign optimization consultations.
      </p>
    ),
    category: "Support",
    icon: "📧",
  }
];

const Item = ({ item, isLast, isOpen, toggleOpen }) => {
  const accordion = useRef(null);

  return (
    <li className={`rounded-lg transition-all ${isOpen ? "bg-zinc-900/50 shadow-lg" : ""}`}>
      <button
        className={`relative flex gap-4 items-start w-full p-6 text-base font-medium text-left ${
          !isLast ? "border-b border-zinc-800" : ""
        } ${isOpen ? "rounded-t-lg" : "rounded-lg"} hover:bg-zinc-900/30 transition-colors`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span
          className={`mt-0.5 h-10 w-10 flex flex-none justify-center items-center rounded-full text-xl ${
            isOpen ? "bg-red-500 text-white" : "bg-zinc-800 text-white"
          } transition-colors duration-300`}
        >
          {item.icon}
        </span>
        <div className="flex flex-col">
          <span className="text-white text-lg font-semibold">{item?.question}</span>
          <span className="text-zinc-400 text-sm font-normal mt-1">Category: {item.category}</span>
        </div>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-all duration-300 text-zinc-400 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-white/70 px-6 pb-6"
          >
            <div className="border-l-2 border-red-500 pl-4 leading-relaxed">{item?.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState({});

  // Filter FAQs based on active category and search term
  const filteredFAQs = faqList.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof item.answer.props.children === 'string' && 
       item.answer.props.children.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && (searchTerm === "" || matchesSearch);
  });

  // Toggle accordion item
  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="bg-black relative pb-24" id="faq">
      {/* Gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-red-500/10 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-30"></div>
      </div>
      
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="inline-block font-semibold text-red-500 mb-4 text-lg">FAQ</p>
          <h2 className="sm:text-5xl text-4xl font-extrabold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Find answers to the most common questions about Prospectr and how it can help you scale your LinkedIn outreach efforts.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="bg-zinc-900 w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors ${
                  activeCategory === category.name
                    ? "bg-red-500 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <ul className="divide-y divide-zinc-800/50 bg-zinc-900/20 rounded-xl overflow-hidden shadow-xl">
              {filteredFAQs.map((item, i) => (
                <Item 
                  key={i} 
                  item={item} 
                  isLast={i === filteredFAQs.length - 1}
                  isOpen={openItems[i] || false}
                  toggleOpen={() => toggleItem(i)}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-12 bg-zinc-900/20 rounded-xl">
              <p className="text-2xl mb-4">🔍</p>
              <p className="text-white font-medium">No results found</p>
              <p className="text-zinc-400 mt-2">Try a different search term or category</p>
            </div>
          )}
        </div>
        
        {/* Still have questions */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">Still have questions?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Support
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
