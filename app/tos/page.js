import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: March 13, 2024

Welcome to Prospectr!

These Terms of Service ("Terms") govern your use of Prospectr's services and website ("Service"). By using our Service, you agree to these Terms.

1. Service Description

Prospectr is a professional prospecting and lead generation platform that helps businesses connect with potential clients and grow their network effectively.

2. User Account and Responsibilities

2.1. You must provide accurate and complete information when creating an account.
2.2. You are responsible for maintaining the security of your account credentials.
2.3. You agree to use the Service in compliance with all applicable laws and regulations.

3. Subscription and Payments

3.1. Access to Prospectr's features requires a paid subscription.
3.2. Subscription fees are billed in advance on a recurring basis.
3.3. We offer a 7-day refund policy for new subscriptions.
3.4. Cancellations will take effect at the end of the current billing period.

4. Acceptable Use

4.1. You agree not to:
- Use the Service for any illegal purposes
- Violate any third-party rights
- Attempt to gain unauthorized access to the Service
- Use the Service to send spam or unsolicited messages
- Reverse engineer or attempt to extract the source code of our software

5. Data and Privacy

5.1. We collect and process user data as described in our Privacy Policy.
5.2. You retain ownership of your data, but grant us license to use it to provide the Service.
5.3. We use cookies and similar technologies to enhance user experience.

6. Intellectual Property

6.1. The Service, including all related software, designs, and content, is owned by Prospectr.
6.2. You may not copy, modify, or create derivative works of our Service or its content.

7. Limitation of Liability

7.1. The Service is provided "as is" without any warranties.
7.2. We are not liable for any indirect, incidental, or consequential damages.
7.3. Our total liability shall not exceed the amount paid by you for the Service in the past 12 months.

8. Termination

8.1. We may suspend or terminate your access to the Service for violations of these Terms.
8.2. You may terminate your account at any time by canceling your subscription.

9. Changes to Terms

9.1. We may modify these Terms at any time.
9.2. We will notify users of significant changes via email.
9.3. Continued use of the Service after changes constitutes acceptance of the new Terms.

10. Governing Law

These Terms are governed by the laws of the jurisdiction in which Prospectr is registered, without regard to its conflict of law provisions.

11. Contact Information

For questions about these Terms, please contact us through our website or support channels.

Thank you for using Prospectr!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
