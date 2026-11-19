import { Suspense } from "react";
import { notFound } from "next/navigation";
import ServiceDetail from "@/app/components/services/serviceDetail";
import {
  SERVICE_DETAILS,
  getServiceBySlug,
} from "../_data";



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