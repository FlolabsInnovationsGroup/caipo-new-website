# CAIPO Landing Page

A modern , responsive landing page for CAIPO built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 14 App Router
- 🎨 Tailwind CSS with modern UI components
- 🔒 Authentication with NextAuth.js and Prisma adapter
- 🎭 Radix UI primitives for accessible components
- 🌈 Framer Motion animations
- 🧪 Testing with Jest and Playwright
- 🔍 SEO optimized
- 📱 Responsive design
- 🎯 Form handling with React Hook Form and Zod validation
- 🎨 Class Variance Authority for type-safe styling
- 🔔 Web Push notifications support
- 🌙 Glass morphism UI design

## Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm
- SQLite (for development)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/FlomadLabsRD/caipo-new-website.git
cd caipo-new-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: SQLite database URL
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: Your application URL

4. Set up the database:
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Testing

The project includes both unit tests and end-to-end tests.

### Unit Tests (Jest)

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

## Project Structure

```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # React components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and services
├── styles/       # Global styles
├── types/        # TypeScript type definitions
└── __mocks__/    # Mock files for testing

tests/
├── unit/         # Unit tests (Jest)
├── utils/        # Test utilities
├── __mocks__/    # Test mocks
└── jest.setup.ts # Jest configuration
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm test:coverage` - Generate test coverage report
- `pnpm generate:pwa` - Generate PWA assets
- `pnpm generate:vapid` - Generate VAPID keys for push notifications

## Key Dependencies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- NextAuth.js
- Prisma
- Radix UI
- Framer Motion
- React Hook Form
- Zod
- Jest
- Playwright
- MSW (Mock Service Worker)

## Browser Support

The application supports all modern browsers:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## License

[MIT License](LICENSE)


