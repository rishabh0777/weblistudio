import Link from "next/link";
// Generic scroll-reveal wrapper (animates elements tagged `data-reveal`).
// It lives in components/about for historical reasons and is not About-specific.
import Reveal from "../components/about/aboutReveal";

/* ==========================================================================
   Webli Studio — Services overview (Server Component)
   All content is rendered in the initial HTML; only the thin client wrapper
   handles the one-time scroll entrance. The hero is not animated, so the H1
   is visible from first paint.

   Structure note: this page deliberately differs from the home page's
   ServicesOverview section (which is left untouched). The home section is a
   teaser; this page gives each service its own row, a "best for" line, and a
   link to its detail page. Detail content is NOT repeated here.

   Detail routes below are linked as specified. They return 404 until those
   pages are built.

   Metadata note: Next.js replaces (does not deep-merge) `openGraph` and
   `twitter` from the root layout, so both are fully specified here.
   ========================================================================== */

const TITLE = "Web Design & Development Services";
const DESCRIPTION =
  "Web design and development services from Webli Studio: business websites, e-commerce development, landing pages and interactive web experiences.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Webli Studio",
    url: "/services",
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

const CONTENT = {
  eyebrow: "SERVICES · WHAT WE DO",
  intro:
    "Webli Studio designs and develops websites for businesses and founders—from a focused landing page to a complete business or e-commerce website. Here is what each service covers and who it suits best.",
  listLabel: "WHAT WE OFFER / 001—006",
  bestFor: "Best for",
  more: "Learn more",
  services: [
    {
      title: "Website Design & Development",
      href: "/services/website-design-development",
      description:
        "Distinctive, responsive websites built around your brand, your audience, and your business goals.",
      bestFor: "Businesses that need a complete, multi-page website.",
    },
    {
      title: "E-commerce Development",
      href: "/services/ecommerce-development",
      description:
        "Thoughtfully designed online stores that make browsing, product discovery, and purchasing feel effortless.",
      bestFor: "Brands ready to sell products online.",
    },
    {
      title: "Landing Pages",
      href: "/services/landing-pages",
      description:
        "Focused pages that communicate your value clearly and encourage visitors to take the next step.",
      bestFor: "A launch, campaign, product, or single offer.",
    },
    {
      title: "Interactive Web Experiences",
      href: "/services/interactive-web-experiences",
      description:
        "Purposeful interactions, refined motion, and distinctive digital experiences that make your website memorable.",
      bestFor: "Brands that want a more distinctive, motion-led website.",
    },
    {
        title: "Website Redesigns",
        href: "/services/website-redesigns",
        description:
          "Revamp your existing website with a fresh design, improved user experience, and updated functionality.",
        bestFor: "Businesses looking to modernize their online presence.",
    },
    {
        title: "Website Maintenance & Support",
        href: "/services/website-maintenance-support",
        description:
          "Keep your website running smoothly with regular updates, security checks, and technical support.",
        bestFor: "Businesses that need ongoing website care and support.",
    }
  ],
  cta: {
    title: "Not sure which service fits?",
    accent: "fits?",
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

export default function ServicesPage() {
  const c = CONTENT;

  return (
    <Reveal>
      {/* Hero ------------------------------------------------------------ */}
      <section
        aria-labelledby="services-page-heading"
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
          id="services-page-heading"
          className="mt-8 text-balance text-[length:clamp(2.35rem,9.5vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(3rem,6.2vw,6.5rem)]"
        >
          <span className="block">Web design and development,</span>{" "}
          <span className="block">
            shaped to your <em className={ACCENT}>goals.</em>
          </span>
        </h1>

        <p className="mt-10 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:mt-14 md:text-lg">
          {c.intro}
        </p>
      </section>

      {/* Services -------------------------------------------------------- */}
      <section
        aria-labelledby="services-list-heading"
        className="container-site"
      >
        <h2 id="services-list-heading" className={`${LABEL} mb-6`}>
          {c.listLabel}
        </h2>

        <ol className="border-b border-border">
          {c.services.map((service, i) => (
            <li
              key={service.href}
              data-reveal
              className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-5 border-t border-border py-8 md:gap-x-8 md:py-10 lg:grid-cols-12 lg:py-12"
            >
              <span
                aria-hidden="true"
                className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-muted md:text-xs lg:col-span-1"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* On mobile this is one column; on desktop it dissolves so the
                  title and description become their own grid columns. */}
              <div className="lg:contents">
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground md:text-3xl lg:col-span-5 lg:text-4xl">
                  <Link
                    href={service.href}
                    className={`${FOCUS_ROW} after:absolute after:inset-0`}
                  >
                    {service.title}
                  </Link>
                </h3>

                <div className="mt-4 lg:col-span-5 lg:mt-1">
                  <p className="max-w-[32rem] text-pretty text-sm leading-relaxed text-muted md:text-base">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                      {c.bestFor}
                    </span>
                    <span aria-hidden="true"> — </span>
                    <span className="sr-only">: </span>
                    {service.bestFor}
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="pt-1 text-lg text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground lg:col-span-1 lg:justify-self-end"
              >
                ↗
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Not sure? CTA --------------------------------------------------- */}
      <section aria-labelledby="services-cta-heading" className="container-site">
        <div className="py-16 md:py-24 md:pb-32">
          <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h2
                id="services-cta-heading"
                className="text-balance text-[length:clamp(2.25rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.5rem,4.6vw,4.5rem)]"
              >
                Not sure which service <em className={ACCENT}>{c.cta.accent}</em>
              </h2>
              <p className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:text-lg">
                {c.cta.copy}
              </p>
            </div>

            <div className="lg:col-span-3 lg:col-start-10 lg:self-end">
              <Link
                href={c.cta.href}
                className="group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground"
              >
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