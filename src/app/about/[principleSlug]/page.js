import { Suspense } from "react";
import { notFound } from "next/navigation";
import PrincipleDetail from "@/app/components/about/principleDetail";
import {
  PRINCIPLES,
  getPrincipleBySlug,
  principlePath,
} from "../_data";



export function generateStaticParams() {
  return PRINCIPLES.map((principle) => ({ principleSlug: principle.slug }));
}

export async function generateMetadata({ params }) {
  const { principleSlug } = await params;
  const principle = getPrincipleBySlug(principleSlug);

  if (!principle) notFound();

  const path = principlePath(principle.slug);
  const socialTitle = `${principle.metaTitle} | Webli Studio`;

  return {
    title: principle.metaTitle,
    description: principle.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: "Webli Studio",
      url: path,
      title: socialTitle,
      description: principle.metaDescription,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Webli Studio — Web Design & Development Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: principle.metaDescription,
      images: ["/og.png"],
    },
  };
}

async function PrincipleContent({ params }) {
  const { principleSlug } = await params;

  if (!getPrincipleBySlug(principleSlug)) notFound();

  return <PrincipleDetail slug={principleSlug} />;
}

export default function PrincipleDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="container-site pb-16 pt-28 md:pt-36" />}>
      <PrincipleContent params={params} />
    </Suspense>
  );
}