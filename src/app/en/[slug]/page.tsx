import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GlobalGrowthPageView } from "@/components/global-growth-page";
import { getGlobalGrowthPage, globalGrowthPages } from "@/lib/global-growth-data";
import { lorenzaProfilePage } from "@/lib/lorenza-profile-data";
import { SITE_URL } from "@/lib/media-authority";
import { socialImageForPath } from "@/lib/seo";

function resolvePage(slug: string) {
  return slug === "lorenza-volponi" ? lorenzaProfilePage : getGlobalGrowthPage(slug);
}

export function generateStaticParams() {
  return globalGrowthPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = resolvePage(slug);
  if (!page) return {};
  const canonical = `${SITE_URL}/en/${page.slug}`;
  const image = socialImageForPath("/en");
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
    openGraph: { title: page.title, description: page.description, url: canonical, type: "website", locale: "en_US", images: [{ url: image, width: 1200, height: 630, alt: page.title }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}

export default async function GlobalGrowthRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = resolvePage(slug);
  if (!page) notFound();
  return <GlobalGrowthPageView page={page} />;
}
