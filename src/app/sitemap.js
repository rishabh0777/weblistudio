import { PRINCIPLES } from "./about/_data";
import { SERVICE_DETAILS, SITE_URL } from "./services/_data";

const staticPages = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/services", priority: 0.8 },
  { path: "/works", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap() {
  const pages = [
    ...staticPages,
    ...PRINCIPLES.map((principle) => ({
      path: `/about/${principle.slug}`,
      priority: 0.6,
    })),
    ...SERVICE_DETAILS.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.7,
    })),
    
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
