import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OliviaWeb SSO",
  description:
    "A site made with Next.js to implement and test OpenWeb's user authentication integration",
  keywords: ["Community", "Home", "Index"],
  authors: [{ name: "Olivia Wissig" }],
  openGraph: {
    title: "OliviaWeb SSO",
    description:
      "A site made with Next.js to implement and test OpenWeb's user authentication integration",
    images: [
      {
        url: "https://images.unsplash.com/photo-1720264715773-ec63cbb81e52?q=60&w=750&auto=format&fit=crop", // Must be an absolute URL
        width: 750,
        height: 500,
      },
    ],
    locale: "en_US",
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
        <NavBar />
        <img
          className="p-4"
          src="https://hitwebcounter.com/counter/counter.php?page=14749641&style=0007&nbdigits=5&type=page&initCount=0"
          title="Counter Widget"
          alt="Visit counter For Websites"
        />
        <div className="flex flex-col justify-center">
          <div className="w-1/2 max-[600px]:w-11/12 m-auto">
            {children}
          </div>
        </div>
      </body>
      <GoogleAnalytics gaId="G-PPJD5QEJH6" />
    </html>
  );
}
