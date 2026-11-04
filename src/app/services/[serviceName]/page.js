import { Suspense } from "react";
import { notFound } from "next/navigation";
import ServiceDetail from "@/app/components/services/serviceDetail";
import {
  SERVICE_DETAILS,
  getServiceBySlug,
} from "../_data";

/* ==========================================================================
   Webli Studio — Service detail route: /services/[serviceName]

   Static segments win over dynamic ones in the App Router, so any service
   page that already exists as its own folder (for example
   app/services/landing-pages/page.jsx) keeps being served and is never
   overwritten. This route fills in only the slugs that don't have a page.

   Only the six known slugs are generated; anything else returns a 404.

   Metadata note: Next.js replaces (does not deep-merge) `openGraph` and
   `twitter` from the root layout, so both are fully specified here, matching
   the Services overview page.
   ========================================================================== */

// export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ serviceName: service.slug }));
}

export async function generateMetadata({ params }) {
  const { serviceName } = await params;
  const service = getServiceBySlug(serviceName);

  if (!service) return {};

  const path = `/services/${service.slug}`;
  const socialTitle = `${service.metaTitle} | Webli Studio`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Webli Studio",
      url: path,
      title: socialTitle,
      description: service.metaDescription,
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
      description: service.metaDescription,
      images: ["/og.png"],
    },
  };
}

async function ServiceContent({ params }) {
  const { serviceName } = await params;

  if (!getServiceBySlug(serviceName)) notFound();

  return <ServiceDetail slug={serviceName} />;
}

export default function ServiceDetailPage({ params }) {
  return (
    <Suspense
      fallback={<div className="container-site pb-16 pt-28 md:pt-36" />}
    >
      <ServiceContent params={params} />
    </Suspense>
  );
}