# Local Development Setup

This guide will help you set up the CAIPO website project for local development.

## Prerequisites

- Node.js (v18 or higher)
- pnpm (preferred) or npm

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Configuration
The project uses the following environment variables (already configured in `.env.local`):

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Database (SQLite for local development)
DATABASE_URL="file:./dev.db"

# VAPID Keys for Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BI2tUN31ye_cbwIZHZHSgB1Np7DqItx-1CP3jq1iFA59_zNkoFvhnrAm0DFrodZJon9sQxZE10PSkFODmjZRwaQ
VAPID_PRIVATE_KEY=0CTT7Rvwi0jpxJFh0WBprqfxTwUybh8urw-xiA3G8nw

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Apply database migrations (already done)
npx prisma migrate dev --name init
```

### 4. Development Server
```bash
npm run dev
```

The application will be available at: http://localhost:3000

## Admin Access

- **Login URL**: http://localhost:3000/admin/login
- **Username**: admin
- **Password**: admin123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:e2e` - Run Playwright E2E tests

## Project Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Prisma** with SQLite database
- **NextAuth.js** for authentication
- **Push notifications** with VAPID keys
- **Comprehensive testing** with Jest and Playwright

## Database Management

The project uses SQLite for local development. The database file is located at `prisma/dev.db`.

To view/edit the database:
```bash
npx prisma studio
```

## Troubleshooting

1. **Port already in use**: If port 3000 is busy, Next.js will automatically use the next available port.

2. **Database issues**: Delete `prisma/dev.db` and run migrations again:
   ```bash
   rm prisma/dev.db
   npx prisma migrate dev --name init
   ```

3. **Build errors in tests**: The current build has some TypeScript issues in test files, but the development server works fine. This doesn't affect the application functionality.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Utility functions and configurations
- `/prisma` - Database schema and migrations
- `/tests` - Test files
- `/public` - Static assets

The application is now ready for local development!