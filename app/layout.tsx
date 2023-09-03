import { AuthProvider } from "@/stores/authStore";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Linkify",
    template: "%s | Linkify",
  },
  description: "Best way to summarize your online portfolio",
  keywords: [
    "linkify",
    "portfolio",
    "links",
    "showcase",
    "projects",
    "profile",
    "linkifyme",
    "career",
    "portal",
    "online",
  ],
  openGraph: {
    siteName: "linkify",
    type: "website",
    locale: "en-Us",
    title: "Linkify",
    description: "Best way to summarize your online portfolio",
    url: "https://linkifyme.vercel.app/",
    images: [
      {
        url: "https://res.cloudinary.com/randomwave45/image/upload/v1693666887/Yellow_Bright_Business_Idea_Tutorial_Youtube_Thumbnail_xhwzw8_1_bbrc2c.png",
        width: 800,
        height: 600,
        alt: "Linkify thumbnail",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
