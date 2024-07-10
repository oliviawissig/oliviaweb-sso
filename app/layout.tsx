import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OliviaWeb SSO",
  description:
    "A site made with Next.js to implement and test OpenWeb's user authentication integration",
  keywords: ['Community', 'Home', 'Index'],
  authors: [{ name: 'Olivia Wissig' }],
  openGraph: {
    title: 'OliviaWeb SSO',
    description: 'A site made with Next.js to implement and test OpenWeb\'s user authentication integration',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1720264715773-ec63cbb81e52?q=60&w=750&auto=format&fit=crop', // Must be an absolute URL
        width: 750,
        height: 500,
      }
    ],
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
