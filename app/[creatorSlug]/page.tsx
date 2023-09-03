import Creator from "@/components/Creator";
import supabase from "@/utils/supabaseClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { creatorSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 0;

async function fetchUser(username: string) {
  const resp = await supabase.from("users").select().eq("username", username);
  const { data } = await supabase
    .from("links")
    .select()
    .eq("username", username);

  return { userData: resp.data?.[0], links: data };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const creatorSlug = params.creatorSlug;
  const { userData } = await fetchUser(creatorSlug);
  if (!userData) return {};
  const imageUrl = userData?.profile_picture_url
    ? userData?.profile_picture_url
    : `https://robohash.org/${userData.username}`;

  return {
    title: `${userData.fullname}`,
    description: "Check out my profile on linkify",
    keywords: [
      `${userData.fullname}`,
      `${userData.username}`,
      "linkify",
      "portfolio",
      "links",
      "showcase",
      "projects",
      "profile",
    ],
    openGraph: {
      type: "website",
      locale: "en",
      description: "Check out my profile on linkify",
      url: `https://linkifyme.vercel.app/${userData.username}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `${userData.username} thumbnail`,
        },
      ],
    },
  };
}

export default async function Profile(props: any) {
  const { userData, links } = await fetchUser(props.params.creatorSlug);

  if (!userData || !Object.keys(userData ?? {}).length) notFound();

  return <Creator userDetaislData={{ ...userData, links }} />;
}
