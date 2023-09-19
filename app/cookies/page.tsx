import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
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

function Cookies() {
  const Iframe = () => {
    return {
      __html: `<iframe src="https://www.freeprivacypolicy.com/live/27ce7496-abc9-407c-9ace-216c959f8f0a" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>`,
    };
  };
  return (
    <>
      <div dangerouslySetInnerHTML={Iframe()} />
    </>
  );
}

export default Cookies;
