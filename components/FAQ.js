"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: "How does Prospectr work with LinkedIn's connection limits?",
    answer: (
      <p>
        Prospectr respects LinkedIn&apos;s daily connection limit of 50 requests per day. Our smart campaign scheduling ensures you stay within these limits while maximizing your outreach effectiveness.
      </p>
    ),
  },
  {
    question: "Is this compliant with LinkedIn's terms of service?",
    answer: (
      <p>
        Yes! Prospectr uses LinkedIn&apos;s official API and follows all their guidelines. We maintain strict compliance to ensure your account&apos;s safety and good standing.
      </p>
    ),
  },
  {
    question: "Can I export my leads to other tools?",
    answer: (
      <p>
        Absolutely! You can export your leads to CSV format or directly integrate with popular CRM systems. This makes it easy to manage your leads across your entire sales stack.
      </p>
    ),
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
  },
  {
    question: "What kind of support do you offer?",
    answer: (
      <p>
        We provide email support 7 days a week. For our premium users, we also offer priority support and personalized campaign optimization consultations.
      </p>
    ),
  }
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-4 items-start w-full py-6 text-base font-medium text-left border-t border-zinc-700"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`mt-0.5 h-6 w-6 flex flex-none justify-center items-center rounded-full ${
            isOpen ? "bg-red-500 text-white" : "bg-zinc-700 text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 transition-all duration-300 ${
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
        <span className="text-white text-lg">{item?.question}</span>
      </button>

      <div
        ref={accordion}
        className={`overflow-hidden transition-all duration-300 ease-in-out text-white/70`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-black" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-red-500 mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
