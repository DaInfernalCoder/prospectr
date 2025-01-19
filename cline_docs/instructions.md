# Project Overview
This will be a lead finder web application called prospectr, it will allow users to find leads by searching for them on linkedin.

THIS IS A MICRO SAAS, AS SUCH ONE FEATURE WILL BE COMPLETED WITH THE LANDED PAGE AND SHIPPED


# Core Functionality
1. Search
- Users will be able to search for leads by name, company, and location.
- Users will be able to view a lead's profile and see their connections.
2. Export 
- Users will be able to save a lead to their list of leads.
- Users will be able to export their list of leads to a csv file.
3. Campaigns
- Users can automatically search for leads by providing a description, which will be processed by a LLM to find the best leads.
- Leads will automatically use linkedin api to send a connection request and a follow up message.
- Users can select rate to send messages/connections per day as follows linkedin api rate limits (max 50 connects per day)
- Users can select from a list of templates to send to leads.
4. Conversations
- Users will be able to view and manage their conversations with leads.
- Users will be able to send messages to leads and track their responses.
# Tech Stack
you will use next js 14, tailwind css, daisy ui, shadcn ui, linkedin api, lucid icons, and supabase.
# Docs

# Current File Structure
app/
├─ api/
│  ├─ auth/
│  ├─ lead/
│  │  └─ route.js
│  ├─ stripe/
│  │  ├─ create-checkout/
│  │  │  └─ route.js
│  │  └─ create-portal/
│  │     └─ route.js
│  └─ webhook/
│     ├─ mailgun/
│     │  └─ route.js
│     └─ stripe/
│        └─ route.js
├─ apple-icon.png
├─ blog/
│  ├─ [articleId]/
│  │  └─ page.js
│  ├─ _assets/
│  │  ├─ components/
│  │  │  ├─ Avatar.js
│  │  │  ├─ BadgeCategory.js
│  │  │  ├─ CardArticle.js
│  │  │  ├─ CardCategory.js
│  │  │  └─ HeaderBlog.js
│  │  ├─ content.js
│  │  └─ images/
│  │     └─ authors/
│  │        └─ marc.png
│  ├─ author/
│  │  └─ [authorId]/
│  │     └─ page.js
│  ├─ category/
│  │  └─ [categoryId]/
│  │     └─ page.js
│  ├─ layout.js
│  └─ page.js
├─ dashboard/
│  ├─ layout.js
│  └─ page.js
├─ error.js
├─ favicon.ico
├─ globals.css
├─ icon.png
├─ layout.js
├─ not-found.js
├─ opengraph-image.png
├─ page.js
├─ privacy-policy/
│  └─ page.js
├─ tos/
│  └─ page.js
└─ twitter-image.png

