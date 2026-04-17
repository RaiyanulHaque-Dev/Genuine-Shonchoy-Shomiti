Project Overview

The Genuine Shonchoy Shomiti application is a comprehensive full-stack solution
designed to manage financial records, member profiles, and organizational
communications for savings associations. It automates manual ledger entries and
streamlines member interactions through integrated messaging.

Key Objectives:
Eliminate paperwork with digital financial tracking.
Enable transparent income and expense monitoring.
Facilitate instant bulk communication with members via SMS and Email.
Provide a secure, role-based administrative dashboard.

Technical Architecture

Frontend React, Vite, Tailwind CSS, Lucide Icons
Backend Node.js, Express
Database & Auth Supabase (PostgreSQL), JWT
Job Queue Upstash Redis, QStash (Messaging Engine)
Messaging sms.net.bd (SMS Gateway), Brevo (Email)
•
•
•
•

Configuration & Setup

Environment Variables (.env)
To run this project, you must configure the following variables in your .env file:

# Database & Authentication
SUPABASE_URL=https://xssvgkegoraymkidznze.supabase.co
SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
JWT_SECRET=your_jwt_secret
# Messaging APIs
SMS_API_KEY=your_sms_net_bd_key
BREVO_API_KEY=your_brevo_v3_key
# Upstash & QStash (Messaging Engine)
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
QSTASH_TOKEN=...
QSTASH_CURRENT_SIGNING_KEY=...
QSTASH_NEXT_SIGNING_KEY=...

Core Features

1. Member Management
Complete CRUD operations for association members, including personal details,
membership status, and join dates.
2. Financial Ledger
Track all income (savings, interest) and expenses (withdrawals, maintenance).
Generates digital receipts and summarizes balances in real-time.
3. Notice & Messaging Engine
A sophisticated queue system that sends bulk notifications. Features include
automated meeting reminders and transaction alerts via SMS.

4. Secure Admin Panel
A "Frosted Glass" UI design providing administrators with a central hub for data
visualization and moderation of association advice.

Deployment Strategy

Frontend: Optimized for deployment on Vercel.
Backend: Scalable deployment on Railway.app.
Database: Hosted on Supabase with row-level security.
