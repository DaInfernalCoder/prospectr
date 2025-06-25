# Prospectr

> **AI-Powered LinkedIn Automation Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

Prospectr is a comprehensive LinkedIn automation platform that streamlines professional networking through AI-powered messaging and intelligent prospect targeting. Built to solve the time-consuming process of manual outreach, this platform enables users to scale their networking efforts while maintaining personalization and authenticity.

**Key Metrics:**

- 40%+ connection acceptance rate
- 1000+ automated connection requests processed
- 15-30 second response times for AI personalization
- 99.9% uptime with robust error handling

## Features

### 🤖 AI-Powered Automation

- **Smart Personalization**: AI analyzes LinkedIn profiles to craft unique, contextual messages
- **Intelligent Sequencing**: Multi-step campaigns with conditional logic and follow-up automation
- **Rate Limiting**: Advanced algorithms prevent LinkedIn restrictions while maximizing throughput

### 📊 Analytics & Insights

- **Real-time Dashboard**: Live campaign performance tracking with conversion metrics
- **A/B Testing**: Compare message templates and optimize for higher response rates
- **ROI Tracking**: Monitor lead generation value and campaign effectiveness

### 🔧 Platform Integration

- **LinkedIn OAuth**: Secure authentication with enterprise-grade security
- **Stripe Integration**: Subscription management with webhook handling
- **Email Automation**: Mailgun integration for transactional communications

## Technical Architecture

### Frontend

- **Next.js 15.2.2** with App Router for optimal performance and SEO
- **React 18** with concurrent features and server components
- **Tailwind CSS** + **DaisyUI** for responsive, accessible design
- **TypeScript** for type safety and developer experience

### Backend

- **Next.js API Routes** with middleware for authentication and rate limiting
- **Supabase** for database, authentication, and real-time subscriptions
- **Unipile SDK** for LinkedIn API integration and compliance
- **Stripe** for payment processing and subscription management

### Infrastructure

- **Vercel** deployment with edge functions
- **Supabase Edge Functions** for background job processing
- **Webhook handling** for real-time event processing

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account (for payments)
- Unipile API access
- Mailgun account (for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/prospectr.git
   cd prospectr
   npm install
   ```

2. **Environment Configuration**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   # Database
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # LinkedIn Integration
   UNIPILE_API_KEY=your_unipile_api_key
   UNIPILE_DSN=your_unipile_dsn

   # Payment Processing
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PRICE_ID=your_price_id

   # Email Service
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain

   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secure_random_string
   ```

3. **Database Setup**

   ```bash
   # Run Supabase migrations
   npx supabase db push

   # Set up Row Level Security policies
   npx supabase db reset
   ```

4. **Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
prospectr/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes and webhooks
│   ├── dashboard/         # Protected dashboard pages
│   ├── auth/              # Authentication pages
│   └── components/        # Page-specific components
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components
│   └── dashboard/         # Dashboard-specific components
├── libs/                  # Core libraries and configurations
├── utils/                 # Utility functions and helpers
├── supabase/             # Database migrations and types
├── types/                # TypeScript type definitions
└── config.js             # Application configuration
```

## Configuration

The application uses a centralized configuration system in `config.js`:

```javascript
const config = {
  appName: "Prospectr",
  appDescription: "AI-powered LinkedIn prospecting tool",
  domainName: "leadsprospectr.com",
  stripe: {
    plans: [
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        price: 15,
        name: "Pro",
        connectionLimit: 500,
        features: [
          "500 connection requests/month",
          "Unlimited active campaigns",
          "AI message personalization",
          "Priority support",
        ],
      },
    ],
  },
  // ... additional configuration
};
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy with automatic CI/CD

### Alternative Platforms

- **Netlify**: Full Next.js support with edge functions
- **Railway**: Database and application hosting
- **DigitalOcean App Platform**: Container-based deployment

## API Documentation

### Authentication

All API routes require authentication via Supabase JWT tokens.

### Rate Limiting

- **Connection Requests**: 15-500 per month (tier-dependent)
- **API Calls**: 1000 requests per hour per user
- **Webhook Processing**: No limits (internal processing)

### Key Endpoints

- `POST /api/linkedin/invitations/send` - Send connection requests
- `GET /api/linkedin/analytics` - Retrieve campaign analytics
- `POST /api/stripe/create-checkout` - Create payment session
- `POST /api/webhook/stripe` - Handle Stripe webhooks

## Performance Optimizations

- **Server-Side Rendering**: Optimized for Core Web Vitals
- **Image Optimization**: WebP format with lazy loading
- **Code Splitting**: Dynamic imports for non-critical components
- **Database Optimization**: Indexed queries and connection pooling
- **Caching**: Redis for session management and API responses

## Security

- **Authentication**: Multi-factor authentication with Supabase
- **Authorization**: Row-level security policies
- **Data Protection**: Encrypted sensitive data storage
- **API Security**: Rate limiting and request validation
- **Compliance**: LinkedIn Terms of Service adherence

## Contributing

We welcome contributions from developers of all experience levels!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/enhancement`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation for API changes
- Ensure responsive design compatibility

## Roadmap

### Q1 2024

- [ ] Multi-platform support (Twitter, Instagram)
- [ ] Advanced AI personalization with GPT-4
- [ ] Team collaboration features
- [ ] Enhanced analytics dashboard

### Q2 2024

- [ ] Mobile application (React Native)
- [ ] Integration marketplace
- [ ] Advanced A/B testing suite
- [ ] Enterprise features

## Support

- **Email**: customerservice@digitalseobull.com
- **Documentation**: [Coming Soon]
- **Community**: [Discord Server]
- **Issues**: [GitHub Issues](https://github.com/yourusername/prospectr/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **ShipFast** - Accelerated development framework
- **Unipile** - LinkedIn API integration platform
- **Supabase** - Backend infrastructure
- **Vercel** - Deployment and hosting platform

---

**Built with passion for automation and efficient networking.**

_Prospectr is designed to enhance professional networking while respecting platform guidelines and user privacy._
