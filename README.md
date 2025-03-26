# CAIPO Landing Page

A modern, responsive landing page for CAIPO built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 14 App Router
- 🔒 Authentication with NextAuth.js
- 🎨 Tailwind CSS for styling
- 🌐 Progressive Web App (PWA) support
- 📱 Responsive design
- 🧪 Testing with Jest and Playwright
- 🔍 SEO optimized
- 🔐 Admin dashboard with early access management
- 📊 Performance monitoring
- 🌙 Glass morphism UI design

## Prerequisites

- Node.js 18 or later
- pnpm
- SQLite (for development)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd caipo-new
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
- `ADMIN_USERNAME`: Admin username
- `ADMIN_PASSWORD`: Admin password

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
│   └── ui/       # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and services
├── styles/       # Global styles and CSS modules
└── types/        # TypeScript type definitions

tests/
├── e2e/         # End-to-end tests (Playwright)
├── unit/        # Unit tests (Jest)
└── utils/       # Test utilities
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm generate:pwa` - Generate PWA assets
- `pnpm generate:vapid` - Generate VAPID keys for push notifications

## Admin Dashboard

The admin dashboard is accessible at `/admin` and requires authentication. Default credentials:
- Username: `admin`
- Password: `caipo2024`

Features:
- Early access signup management
- Performance monitoring
- User analytics

## Contributing

1. Create a feature branch
2. Make your changes
3. Write or update tests
4. Update documentation
5. Submit a pull request

## Performance

The application is optimized for performance:
- Server-side rendering with Next.js
- Image optimization
- Code splitting
- Progressive Web App
- Performance monitoring

## Browser Support

The application supports all modern browsers:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## License

[MIT License](LICENSE)

## Support

For support, email [support@caipo.ai](mailto:support@caipo.ai)
