# Database Setup Instructions

This guide will help you set up PostgreSQL and Prisma for the SentinelX dashboard backend.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Git

## Setup Steps

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Database Configuration

Create a `.env` file in the root directory:

```env
# Database URL for PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/sentinelx_db?schema=public"

# Replace with your actual PostgreSQL credentials:
# username: your PostgreSQL username
# password: your PostgreSQL password
# localhost:5432: your PostgreSQL host and port
# sentinelx_db: the database name (will be created if doesn't exist)
```

### 3. Create Database

Connect to PostgreSQL and create the database:

```sql
CREATE DATABASE sentinelx_db;
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Database Schema

```bash
npm run db:push
```

### 6. Seed Database with Sample Data

```bash
npm run db:seed
```

### 7. Start Development Server

```bash
npm run dev
```

## API Endpoints

The backend provides the following API endpoints:

### Dashboard Data
- `GET /api/dashboard` - Get dashboard overview data
- `GET /api/dashboard?wallet=0x...` - Filter by wallet address

### Audits
- `GET /api/audits` - Get all audits with pagination
- `GET /api/audits?wallet=0x...` - Filter audits by wallet
- `POST /api/audits` - Create new audit
- `GET /api/audits/[id]` - Get specific audit
- `PUT /api/audits/[id]` - Update audit
- `DELETE /api/audits/[id]` - Delete audit

### Users
- `GET /api/users/[walletAddress]` - Get user data by wallet
- `POST /api/users/[walletAddress]` - Create/update user

### Statistics
- `GET /api/stats` - Get global statistics

## Database Schema

The database includes the following main tables:

- **users** - Wallet addresses and user data
- **audits** - Smart contract audit records with transaction hashes
- **vulnerabilities** - Security vulnerabilities found in audits
- **ai_insights** - AI-generated security insights
- **audit_metrics** - Performance and security metrics
- **global_stats** - Global platform statistics
- **vulnerability_types** - Categorized vulnerability types

## Key Features

1. **Global Dashboard** - Shows all audits across all wallets
2. **Wallet Filtering** - Filter audits by specific wallet address
3. **Transaction Tracking** - Each audit is linked to a blockchain transaction hash
4. **Real-time Data** - Live updates from PostgreSQL database
5. **Comprehensive Analytics** - Vulnerability tracking, security scores, and AI insights

## Development Tools

- **Prisma Studio**: `npm run db:studio` - Visual database browser
- **Database Reset**: `npm run db:push --force-reset` - Reset and recreate database
- **Migration**: `npm run db:migrate` - Create and apply migrations

## Production Deployment

For production, update the `DATABASE_URL` in your environment to point to your production PostgreSQL instance and ensure all environment variables are properly configured.
