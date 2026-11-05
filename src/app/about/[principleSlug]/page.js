import { Suspense } from "react";
import { notFound } from "next/navigation";
import PrincipleDetail from "@/app/components/about/principleDetail";
import {
  PRINCIPLES,
  getPrincipleBySlug,
  principlePath,
} from "../_data";

/* ==========================================================================
   Webli Studio — About principle route: /about/[principleSlug]

   Same conventions as /services/[serviceName]:
   - Content, titles and descriptions all come from app/about/_data.js.
   - generateStaticParams pre-builds only the known principle slugs; any other
     slug calls notFound() and returns a 404.
   - `params` is read inside <Suspense>, as Next.js 16 with cacheComponents
     expects (no `dynamicParams` export, which that setting rejects).

   Metadata note: Next.js replaces (does not deep-merge) `openGraph` and
   `twitter` from the root layout, so both are fully specified here.
   ========================================================================== */

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