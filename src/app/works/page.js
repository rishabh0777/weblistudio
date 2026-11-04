import Image from "next/image";
import Link from "next/link";
// Generic scroll-reveal wrapper (animates elements tagged `data-reveal`),
// the same one the Services overview page uses.
import Reveal from "@/app/components/about/aboutReveal";

import { PROJECTS, FOUNDER_PROJECT } from "@/app/components/landing/selectedWork/project";
import { SERVICE_DETAILS, getServiceBySlug, SITE_URL } from "../services/_data";

/* ==========================================================================
   Webli Studio — Work / portfolio page (Server Component)
   All content is rendered in the initial HTML; only the shared Reveal wrapper
   is client code. Project data lives in
   components/landing/selectedWork/projects.js and is shared with the homepage
   carousel. Fields that don't exist for a project are simply not rendered.

   Metadata note: Next.js replaces (does not deep-merge) `openGraph` and
   `twitter` from the root layout, so both are fully specified here.
   ========================================================================== */

const TITLE = "Web Design & Development Portfolio";
const DESCRIPTION =
  "Selected web design and development projects by Webli Studio: websites for a marketing agency, a nutrition brand and a photography business.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Webli Studio",
    url: "/work",
    title: `${TITLE} | Webli Studio`,
    description: DESCRIPTION,
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
    title: `${TITLE} | Webli Studio`,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

const CONTACT_HREF = "/contact";
const SERVICES_HREF = "/services";

const CONTENT = {
  eyebrow: "WORK · SELECTED PROJECTS",
  intro:
    "A selection of websites designed and developed by Webli Studio. Each project with a live site links straight to it, so you can judge the work for yourself before getting in touch.",
  listLabel: "PROJECTS / 001—006",
  founder: {
    label: "FOUNDER’S PORTFOLIO",
    copy: "Separate from our agency projects: the personal portfolio website of Webli Studio’s founder Rishabh Srivastava.",
    cta: "Visit the portfolio",
  },
  services: {
    label: "SERVICES",
    title: "The services behind the work",
    copy: "Every project starts from one of these. Explore what each service covers and who it suits.",
  },
  cta: {
    title: "Have a project in mind?",
    accent: "in mind?",
    copy: "Tell us about your business and what you want your website to do. We’ll help you work out the right starting point.",
    label: "Start a project",
    href: CONTACT_HREF,
  },
};

const LABEL =
  "font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted md:text-xs";

const ACCENT =
  "font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]";

const FOCUS_ROW =
  "focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-foreground";

const H2 =
  "text-balance text-[length:clamp(2rem,6vw,3rem)] font-semibold leading-[1] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.25rem,3.6vw,3.25rem)]";

const PILL =
  "group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground";

function buildJsonLd() {
  const url = `${SITE_URL}/work`;
  const linked = PROJECTS.filter((project) => project.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: TITLE,
        description: DESCRIPTION,
        url,
        isPartOf: { "@type": "WebSite", name: "Webli Studio", url: SITE_URL },
        mainEntity: { "@id": `${url}#projects` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#projects`,
        itemListElement: linked.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: project.title,
          url: project.href,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Work", item: url },
        ],
      },
    ],
  };
}

function ProjectCard({ project, index }) {
  const isExternal = Boolean(project.href?.startsWith("http"));
  const service = project.service ? getServiceBySlug(project.service) : null;

  return (
    <li data-reveal className="group relative flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface transition-colors duration-500 group-hover:border-foreground/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt ?? ""}
            fill
            sizes="(min-width: 768px) 46vw, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col justify-between p-6"
          >
            <span className={LABEL}>{String(index + 1).padStart(2, "0")}</span>
            <span className="font-serif text-3xl italic leading-[0.95] tracking-[-0.02em] text-muted md:text-5xl">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span aria-hidden="true" className={LABEL}>
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.category ? (
          <span className={`${LABEL} text-right`}>{project.category}</span>
        ) : null}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground md:text-3xl">
          {project.href ? (
            <Link
              href={project.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`${FOCUS_ROW} after:absolute after:inset-0`}
            >
              {project.title}
              {isExternal ? (
                <span className="sr-only"> (opens the live website in a new tab)</span>
              ) : null}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        {project.href ? (
          <span
            aria-hidden="true"
            className="pt-1 text-lg text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          >
            ↗
          </span>
        ) : null}
      </div>

      {project.description ? (
        <p className="mt-3 max-w-[32rem] text-pretty text-sm leading-relaxed text-muted md:text-base">
          {project.description}
        </p>
      ) : null}

      {service ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
            Service
          </span>
          <span aria-hidden="true"> — </span>
          <span className="sr-only">: </span>
          <Link
            href={`${SERVICES_HREF}/${service.slug}`}
            className="relative z-10 underline decoration-border underline-offset-4 transition-colors duration-300 hover:text-foreground hover:decoration-foreground"
          >
            {service.title}
          </Link>
        </p>
      ) : null}
    </li>
  );
}

export default function WorkPage() {
  const c = CONTENT;
  // "<" is escaped so the JSON can never close the script tag early.
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <Reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Hero ------------------------------------------------------------ */}
      <section
        aria-labelledby="work-page-heading"
        className="container-site pb-16 pt-28 md:pb-20 md:pt-36"
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className={`${LABEL} sm:whitespace-nowrap`}>{c.eyebrow}</p>
          <span
            aria-hidden="true"
            className="h-px w-full bg-border sm:w-auto sm:flex-1"
          />
        </div>

        <h1
          id="work-page-heading"
          className="mt-8 text-balance text-[length:clamp(2.35rem,9.5vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(3rem,6.2vw,6.5rem)]"
        >
          <span className="block">Web design and development</span>{" "}
          <span className="block">
            work, <em className={ACCENT}>live on the web.</em>
          </span>
        </h1>

        <p className="mt-10 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:mt-14 md:text-lg">
          {c.intro}
        </p>
      </section>

      {/* Projects -------------------------------------------------------- */}
      <section aria-labelledby="work-list-heading" className="container-site">
        <h2 id="work-list-heading" className={`${LABEL} mb-8`}>
          {c.listLabel}
        </h2>

        <ol className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </ol>
      </section>

      {/* Founder portfolio (separate from the agency projects) ----------- */}
      <section
        aria-labelledby="founder-heading"
        className="container-site mt-20 md:mt-28"
      >
        <div
          data-reveal
          className="grid gap-6 border-t border-border py-10 md:py-14 lg:grid-cols-12 lg:gap-8"
        >
          <h2 id="founder-heading" className={`${LABEL} lg:col-span-4`}>
            {c.founder.label}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="max-w-[32rem] text-pretty text-base leading-relaxed text-muted md:text-lg">
              {c.founder.copy}
            </p>
            <Link
              href={FOUNDER_PROJECT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-12 items-center gap-3 text-sm font-medium text-foreground"
            >
              <span className="border-b border-border pb-0.5 transition-colors duration-300 group-hover:border-foreground">
                {c.founder.cta}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services -------------------------------------------------------- */}
      <section aria-labelledby="work-services-heading" className="container-site">
        <div
          data-reveal
          className="grid gap-8 border-t border-border py-14 md:py-20 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-4">
            <p className={LABEL}>{c.services.label}</p>
            <h2 id="work-services-heading" className={`${H2} mt-5`}>
              {c.services.title}
            </h2>
            <p className="mt-6 max-w-[26rem] text-pretty text-base leading-relaxed text-muted">
              {c.services.copy}
            </p>
          </div>

          <ul className="border-b border-border lg:col-span-7 lg:col-start-6">
            {SERVICE_DETAILS.map((service) => (
              <li key={service.slug} className="border-t border-border">
                <Link
                  href={`${SERVICES_HREF}/${service.slug}`}
                  className="group flex min-h-12 items-center justify-between gap-6 py-5 text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl"
                >
                  {service.title}
                  <span
                    aria-hidden="true"
                    className="text-lg font-normal text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------- */}
      <section aria-labelledby="work-cta-heading" className="container-site">
        <div className="border-t border-border py-16 md:py-24 md:pb-32">
          <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h2
                id="work-cta-heading"
                className="text-balance text-[length:clamp(2.25rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.5rem,4.6vw,4.5rem)]"
              >
                Have a project <em className={ACCENT}>{c.cta.accent}</em>
              </h2>
              <p className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:text-lg">
                {c.cta.copy}
              </p>
            </div>

            <div className="lg:col-span-3 lg:col-start-10 lg:self-end">
              <Link href={c.cta.href} className={PILL}>
                {c.cta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}