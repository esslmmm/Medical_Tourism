# Medical Tourism Application

A comprehensive platform connecting patients with hospitals, doctors, and medical services across different locations. The application provides an end-to-end solution for medical travel planning, booking management, payment processing, and administrative oversight.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Admin Interface](#admin-interface)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Deployment](#deployment)

## Features

### User Features
- **Hospital & Doctor Discovery**: Browse hospitals, doctors, and medical packages
- **Medical Packages**: View treatment packages with pricing and services
- **Trip Planning**: Plan medical tourism trips with attractions and itineraries
- **Booking System**: Create and manage appointment bookings
- **Payment Processing**: Secure Stripe integration for payments
- **User Profiles**: Manage personal information and booking history
- **Feedback & Reviews**: Rate and review medical services

### Admin Features
- **Payment Dashboard**: Real-time transaction monitoring and revenue analytics
- **Booking Management**: Complete booking lifecycle oversight
- **Hospital Management**: Add, edit, and manage hospital listings
- **Doctor Management**: Manage doctor profiles with certifications and education
- **Medical Packages**: Create and manage treatment packages
- **Trip Management**: Design and manage medical tourism trips with routes
- **User Management**: Monitor user accounts and activity
- **Activity Logs**: Track all system activities and changes
- **Feedback Management**: Review and approve customer feedback

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS 4
- **Icons**: Lucide React, React Icons
- **Animations**: Framer Motion
- **Date Handling**: date-fns, moment, react-datepicker, react-date-range

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js v5

### Database
- **Primary**: PostgreSQL (via Prisma)
- **Secondary**: MongoDB (optional)
- **ODM**: Mongoose
- **Cache**: Redis, IORedis

### Additional Services
- **ORM**: Prisma
- **Payment**: Stripe
- **Image Storage**: Cloudinary
- **Email**: Nodemailer
- **Real-time**: Socket.io
- **Encryption**: bcryptjs

### DevTools
- **Language**: TypeScript
- **Bundler**: Turbopack
- **Linting**: ESLint
- **Build Analyzer**: @next/bundle-analyzer

## Project Structure

```
mt_app/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin dashboard pages
│   │   ├── booking/         # Booking management
│   │   ├── doctors/         # Doctor management
│   │   ├── hospital/        # Hospital management
│   │   ├── packages/        # Medical packages
│   │   ├── trips/           # Trip management
│   │   ├── routes/          # Route management
│   │   ├── payment-dashboard/ # Payment analytics
│   │   └── page.tsx         # Main dashboard
│   ├── api/                 # API routes
│   │   └── admin/           # Admin API endpoints
│   ├── auth/                # Authentication pages
│   ├── user/                # User-facing pages
│   ├── checkout/            # Payment checkout
│   ├── staff/               # Staff pages
│   └── layout.tsx           # Root layout
├── components/              # Reusable React components
│   ├── admin_component/     # Admin-specific components
│   │   ├── Layout/          # AdminLayout, Sidebar, Header
│   │   ├── booking-management/
│   │   ├── booking-details/
│   │   ├── package-management/
│   │   └── ui/              # Common UI components
│   └── ...
├── prisma/                  # Database schema
│   └── schema.prisma        # Prisma ORM definitions
├── types/                   # TypeScript type definitions
│   └── admin.ts            # Admin entity interfaces
├── lib/                     # Utility functions
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
├── server/                  # Server-side utilities
├── utils/                   # Helper functions
├── middleware.ts            # Next.js middleware
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git

### Clone Repository
```bash
git clone <repository-url>
cd mt_app
```

### Install Dependencies
```bash
npm install
```

### Database Setup
1. Create a PostgreSQL database
2. Update `DATABASE_URL` in `.env.local`
3. Run migrations:
```bash
npx prisma migrate dev
```

4. (Optional) Seed initial data:
```bash
npm run db:seed
```

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/medical_tourism"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Cloudinary (Image Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (Nodemailer)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Redis (Optional)
REDIS_URL="redis://localhost:6379"

# MongoDB (Optional)
MONGODB_URI="mongodb://localhost:27017/medical_tourism"
```

## Running the Application

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

### Linting
```bash
npm run lint
```

## Admin Interface

The admin dashboard provides complete management of the medical tourism platform:

- **Payment Dashboard**: Monitor transactions, filter by status and date, view revenue metrics (gross/net income, average order value)
- **Booking Management**: Track bookings from creation to completion with status updates
- **Hospital Management**: CRUD operations for hospital listings, specialties, and contact information
- **Doctor Management**: Manage doctor profiles with education, certifications, and language capabilities
- **Medical Packages**: Create and manage treatment packages linked to hospitals
- **Trip & Routes**: Design multi-day itineraries with attractions and pricing
- **User Management**: Monitor user accounts, status, and booking history
- **Feedback Management**: Collect, review, and approve customer feedback
- **Activity Logs**: Track all system activities and changes

**Access Point**: `/admin` (requires authentication)

**UI Structure**: All admin pages are wrapped in AdminLayout with persistent Sidebar navigation and Header controls.

## Database

### Schema Overview
The application uses Prisma ORM with PostgreSQL. Key models include:

- **users**: User accounts with authentication
- **appointments**: Medical appointment scheduling
- **package_bookings**: Booking records for medical packages
- **packages**: Medical treatment packages
- **doctors**: Doctor profiles with education/certifications
- **hospitals**: Hospital information and services
- **tours/trips**: Medical tourism trip planning
- **routes**: Trip itineraries and attractions
- **payments**: Transaction records
- **feedback**: User reviews and ratings
- **files**: Document storage (appointment files)

### Run Migrations
```bash
npx prisma migrate dev
```

### Access Prisma Studio
```bash
npx prisma studio
```

## API Endpoints

All API routes are located in `/app/api/`:

### Admin APIs
- `GET/POST /api/admin/booking/packages` - Manage booking packages
- `GET/POST /api/admin/booking/services` - Manage booking services
- `GET/POST /api/admin/services/hospitals` - Hospital management
- `GET/POST /api/admin/services/doctors` - Doctor management
- `GET/POST /api/admin/services/packages` - Package management
- `GET/POST /api/admin/services/trips` - Trip management
- `GET/POST /api/admin/services/places` - Place management
- `GET/POST /api/admin/services/guides` - Guide services
- `GET/POST /api/admin/chats` - Chat management

### Payment APIs
- `POST /api/payment` - Process payments
- `GET /api/payment` - Retrieve payment history

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

## Authentication

The application uses **NextAuth.js v5** with:
- Email/password authentication
- NextAuth Prisma Adapter
- Protected routes via middleware
- Session management

**Auth Configuration**: `next-auth.d.ts` and `middleware.ts`

## Deployment

### Docker
```bash
docker-compose up -d
```

See `Dockerfile` and `docker-compose.yml` for container configuration.

### Vercel (Recommended for Next.js)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
- Set all `.env.local` variables in your hosting platform
- Update `NEXTAUTH_URL` to your production domain
- Use production database credentials
- Use production API keys (Stripe, Cloudinary, etc.)

## Development Notes

- **Hot Reload**: Changes to pages/components auto-update during development
- **TypeScript**: Full type safety throughout the codebase
- **Styling**: Tailwind CSS with responsive design
- **Code Organization**: Modular components with clear separation of concerns

## Support & Contributing

For issues or feature requests, please create an issue in the repository.

---

**Last Updated**: December 2025
