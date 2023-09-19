import Login from "@/components/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
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

function Index() {
  return <Login />;
}

export default Index;
