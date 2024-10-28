import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin Dashboard',
  },
  description: 'A powerful admin dashboard for managing your content and users',
  keywords: ['admin', 'dashboard', 'management', 'content', 'users'],
  authors: [{ name: 'Admin Dashboard Team' }],
  creator: 'Admin Dashboard Team',
  publisher: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Admin Dashboard',
    title: 'Admin Dashboard',
    description: 'A powerful admin dashboard for managing your content and users',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Admin Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard',
    description: 'A powerful admin dashboard for managing your content and users',
    images: ['https://your-domain.com/twitter-image.jpg'],
    creator: '@yourusername',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}