import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: March 13, 2024

Privacy Policy for Prospectr

At Prospectr ("we," "us," or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our prospecting and lead generation service.

1. Information We Collect

1.1. Personal Information
We collect the following types of personal information:
- Name and contact details
- Business information
- Email address
- Payment information
- Account credentials
- Usage data and preferences
- Communication history

1.2. Professional Network Information
- LinkedIn profile data (when connected)
- Professional connections
- Business relationships
- Industry and role information

1.3. Automated Information Collection
- Log data and analytics
- Device information
- IP addresses
- Cookies and similar technologies
- Usage patterns and preferences

2. How We Use Your Information

2.1. Core Service Functionality
- Providing prospecting and lead generation services
- Managing your account
- Processing payments
- Sending service notifications
- Improving our services

2.2. Communication
- Sending product updates
- Providing customer support
- Sharing relevant marketing materials
- Responding to your requests

2.3. Service Improvement
- Analyzing usage patterns
- Developing new features
- Enhancing user experience
- Troubleshooting issues

3. Data Sharing and Disclosure

3.1. We may share your information with:
- Service providers and partners
- Payment processors
- Analytics providers
- Cloud storage providers

3.2. We do NOT:
- Sell your personal information
- Share your data with unauthorized third parties
- Use your data for purposes other than stated

4. Data Security

4.1. Security Measures
- Encryption of sensitive data
- Regular security audits
- Access controls
- Secure data storage

4.2. Data Retention
- We retain data as long as necessary
- You can request data deletion
- Some data may be retained for legal purposes

5. Your Rights and Choices

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request data deletion
- Opt-out of marketing communications
- Export your data
- Restrict data processing

6. Children's Privacy

We do not knowingly collect or maintain information from persons under 16 years of age. If we learn that personal information of persons under 16 has been collected on our Service, we will take appropriate steps to delete this information.

7. International Data Transfers

If we transfer your data internationally, we ensure appropriate safeguards are in place to protect your information and comply with applicable data protection laws.

8. Cookie Policy

We use cookies and similar technologies to:
- Maintain your session
- Remember your preferences
- Analyze usage patterns
- Improve our service
You can control cookie settings through your browser preferences.

9. Changes to This Policy

9.1. We may update this Privacy Policy periodically to reflect:
- Changes in our practices
- New features or services
- Legal requirements

9.2. We will notify you of significant changes by:
- Email notification
- Website announcement
- In-app notification

10. Contact Us

If you have questions about this Privacy Policy or our privacy practices, please contact us:
- Through our website contact form
- Via our support channels

11. Legal Compliance

We comply with applicable data protection laws and regulations, including:
- GDPR (where applicable)
- CCPA (where applicable)
- Local data protection laws

Your trust is important to us, and we are committed to protecting your privacy and security while using Prospectr.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
