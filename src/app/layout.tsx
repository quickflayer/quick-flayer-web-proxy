import { Geist, Geist_Mono } from 'next/font/google';

import Providers from '@core/providers';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quick Flayer',
  description: 'A modern authentication and dashboard application',
  manifest: '/manifest.json',
  themeColor: '#667eea',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Quick Flayer',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Quick Flayer',
    title: 'Quick Flayer',
    description: 'A modern authentication and dashboard application',
  },
  twitter: {
    card: 'summary',
    title: 'Quick Flayer',
    description: 'A modern authentication and dashboard application',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Quick Flayer" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Quick Flayer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#667eea" />

        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/icon-192x192.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/icon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#667eea"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://quickflayer.com" />
        <meta name="twitter:title" content="Quick Flayer" />
        <meta
          name="twitter:description"
          content="A modern authentication and dashboard application"
        />
        <meta name="twitter:image" content="/icons/icon-192x192.png" />
        <meta name="twitter:creator" content="@quickflayer" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Quick Flayer" />
        <meta
          property="og:description"
          content="A modern authentication and dashboard application"
        />
        <meta property="og:site_name" content="Quick Flayer" />
        <meta property="og:url" content="https://quickflayer.com" />
        <meta property="og:image" content="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
