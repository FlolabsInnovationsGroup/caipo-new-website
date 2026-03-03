import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { headers } from "next/headers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const GA_MEASUREMENT_ID = "G-4463J78ER3";

export const metadata: Metadata = {
  title: "CAIPO - AI-Powered Productivity Assistant",
  description:
    "CAIPO is your AI-powered productivity assistant, helping you work smarter and achieve more.",
  keywords: [
    "AI assistant",
    "productivity",
    "automation",
    "artificial intelligence",
    "CAIPO",
  ],
  authors: [{ name: "CAIPO Team" }],
  creator: "CAIPO",
  publisher: "CAIPO",
  metadataBase: new URL("https://caipo.ai"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "CAIPO - AI-Powered Productivity Assistant",
    description:
      "CAIPO is your AI-powered productivity assistant, helping you work smarter and achieve more.",
    url: "https://caipo.ai",
    siteName: "CAIPO",
    images: [
      {
        url: "/social-og-image.png",
        width: 1200,
        height: 630,
        alt: "CAIPO - AI-Powered Productivity Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAIPO - AI-Powered Productivity Assistant",
    description:
      "CAIPO is your AI-powered productivity assistant, helping you work smarter and achieve more.",
    images: ["/social-og-image.png"],
    creator: "@CAIPO",
    site: "@CAIPO",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Force dynamic rendering for auth
  headers();

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}




// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import './globals.css'
// import { Providers } from './providers'
// import { headers } from 'next/headers'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'CAIPO - AI-Powered Productivity Assistant',
//   description: 'CAIPO is your AI-powered productivity assistant, helping you work smarter and achieve more.',
//   keywords: ['AI assistant', 'productivity', 'automation', 'artificial intelligence', 'CAIPO'],
//   authors: [{ name: 'CAIPO Team' }],
//   creator: 'CAIPO',
//   publisher: 'CAIPO',
//   metadataBase: new URL('https://caipo.ai'),
//   alternates: {
//     canonical: '/',
//   },
//   openGraph: {
//     title: 'CAIPO - AI-Powered Productivity Assistant',
//     description: 'CAIPO is your AI-powered productivity assistant, helping you work smarter and achieve more.',
//     url: 'https://caipo.ai',
//     siteName: 'CAIPO',
//     images: [
//       {
//         url: '/social-og-image.png',
//         width: 1200,
//         height: 630,
//         alt: 'CAIPO - AI-Powered Productivity Assistant',
//       },
//     ],
//     locale: 'en_US',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'CAIPO - AI-Powered Productivity Assistant',
//     description: 'CAIPO is your AI-powered productivity assistant, helping you work smarter and achieve more.',
//     images: ['/social-og-image.png'],
//     creator: '@CAIPO',
//     site: '@CAIPO',
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   verification: {
//     google: 'your-google-verification-code',
//     yandex: 'your-yandex-verification-code',
//   },
//   icons: {
//     icon: [
//       { url: '/favicon.svg', type: 'image/svg+xml' },
//       { url: '/favicon.ico', type: 'image/x-icon' },
//       { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
//       { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
//     ],
//     shortcut: '/favicon.ico',
//     apple: [
//       { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
//     ],
//     other: [
//       { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
//       { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
//     ]
//   }
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // Force dynamic rendering for auth
//   headers()
  
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   )
// }
