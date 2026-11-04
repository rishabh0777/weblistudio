import Link from "next/link";
// Generic scroll-reveal wrapper (animates elements tagged `data-reveal`),
// the same one the Services overview page uses.
import Reveal from "@/app/components/about/aboutReveal";
import {
  SITE_URL,
  getServiceBySlug,
} from "@/app/services/_data";

/* ==========================================================================
   Webli Studio — Service detail page (Server Component)
   All content is rendered in the initial HTML. The only client code is the
   shared Reveal wrapper (one-time scroll entrance). The hero is not animated,
   so the H1 is visible from first paint.

   Sections are rendered only when the service defines them (`extra` is
   optional), so each page keeps its own structure.
   ========================================================================== */

const CONTACT_HREF = "/contact";
const SERVICES_HREF = "/services";

const LABEL =
  "font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted md:text-xs";

const ACCENT =
  "font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]";

const H2 =
  "mt-5 text-balance text-[length:clamp(1.75rem,5.5vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground md:text-[length:clamp(2rem,3.2vw,2.75rem)]";

const ITEM_TITLE =
  "text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-xl";

const ITEM_TEXT =
  "mt-2 max-w-[36rem] text-pretty text-sm leading-relaxed text-muted md:text-base";

const PILL =
  "group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground";

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      ↗
    </span>
  );
}

function Section({ id, label, title, intro, children }) {
  return (
    <section aria-labelledby={`${id}-heading`} className="container-site">
      <div
        data-reveal
        className="grid gap-8 border-t border-border py-14 md:py-20 lg:grid-cols-12 lg:gap-x-8"
      >
        <div className="lg:col-span-4">
          <p className={LABEL}>{label}</p>
          <h2 id={`${id}-heading`} className={H2}>
            {title}
          </h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {intro ? (
            <p className="mb-8 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:text-lg">
              {intro}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}

function ItemList({ items }) {
  return (
    <ul className="border-b border-border">
      {items.map((item) => (
        <li
          key={item.title}
          className="border-t border-border py-6 md:py-7"
        >
          <h3 className={ITEM_TITLE}>{item.title}</h3>
          <p className={ITEM_TEXT}>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function buildJsonLd(service) {
  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        url,
        provider: {
          "@type": "Organization",
          name: "Webli Studio",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}${SERVICES_HREF}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}

export default function ServiceDetail({ slug }) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const related = service.related
    .map((item) => ({ ...item, target: getServiceBySlug(item.slug) }))
    .filter((item) => item.target);

  // "<" is escaped so the JSON can never close the script tag early.
  const jsonLd = JSON.stringify(buildJsonLd(service)).replace(/</g, "\\u003c");

  return (
    <Reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Hero ------------------------------------------------------------ */}
      <section
        aria-labelledby="service-heading"
        className="container-site pb-16 pt-28 md:pb-20 md:pt-36"
      >
        <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
          <ol className={`${LABEL} flex flex-wrap items-center gap-x-3 gap-y-1`}>
            <li>
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={SERVICES_HREF}
                className="transition-colors duration-300 hover:text-foreground"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {service.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className={`${LABEL} sm:whitespace-nowrap`}>{service.eyebrow}</p>
          <span
            aria-hidden="true"
            className="h-px w-full bg-border sm:w-auto sm:flex-1"
          />
        </div>

        <h1
          id="service-heading"
          className="mt-8 text-balance text-[length:clamp(2.1rem,8.5vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(2.75rem,5.2vw,5.5rem)]"
        >
          {service.h1.before}{" "}
          <em className={ACCENT}>{service.h1.accent}</em>
        </h1>

        <p className="mt-10 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:mt-14 md:text-lg">
          {service.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={CONTACT_HREF} className={PILL}>
            Start a project
            <Arrow />
          </Link>
          <Link
            href={SERVICES_HREF}
            className="inline-flex min-h-12 items-center text-sm text-muted underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
          >
            View all services
          </Link>
        </div>
      </section>

      {/* Overview -------------------------------------------------------- */}
      <Section
        id="overview"
        label="Overview"
        title="What this service covers"
      >
        <div className="max-w-[36rem] space-y-6">
          {service.overview.map((paragraph) => (
            <p
              key={paragraph}
              className="text-pretty text-base leading-relaxed text-muted md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* Problems -------------------------------------------------------- */}
      <Section id="problems" label="Why it matters" title={service.problems.title}>
        <ItemList items={service.problems.items} />
      </Section>

      {/* Deliverables ---------------------------------------------------- */}
      <Section
        id="deliverables"
        label="Deliverables"
        title={service.deliverables.title}
      >
        <ItemList items={service.deliverables.items} />
      </Section>

      {/* Optional, service-specific section ------------------------------ */}
      {service.extra ? (
        <Section
          id="extra"
          label="In practice"
          title={service.extra.title}
          intro={service.extra.intro}
        >
          <ItemList items={service.extra.items} />
        </Section>
      ) : null}

      {/* Process --------------------------------------------------------- */}
      <Section id="process" label="Process" title={service.process.title}>
        <ol className="border-b border-border">
          {service.process.steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-t border-border py-6 md:gap-x-8 md:py-7"
            >
              <span
                aria-hidden="true"
                className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-muted md:text-xs"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={ITEM_TITLE}>{step.title}</h3>
                <p className={ITEM_TEXT}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Best for -------------------------------------------------------- */}
      <Section id="best-for" label="Best for" title="Who this service suits">
        <ul className="border-b border-border">
          {service.bestFor.map((text) => (
            <li
              key={text}
              className="flex gap-4 border-t border-border py-5 text-base leading-relaxed text-foreground md:text-lg"
            >
              <span aria-hidden="true" className="text-muted">
                —
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ ------------------------------------------------------------- */}
      <Section
        id="faq"
        label="FAQ"
        title="Frequently asked questions"
      >
        <ItemList
          items={service.faqs.map((faq) => ({ title: faq.q, text: faq.a }))}
        />
      </Section>

      {/* Related services ------------------------------------------------ */}
      {related.length > 0 ? (
        <Section
          id="related"
          label="Related services"
          title="Other services you may need"
        >
          <ul className="border-b border-border">
            {related.map((item) => (
              <li key={item.slug} className="border-t border-border">
                <Link
                  href={`${SERVICES_HREF}/${item.slug}`}
                  className="group grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 py-6 md:py-7"
                >
                  <div>
                    <h3 className={ITEM_TITLE}>{item.target.title}</h3>
                    <p className={ITEM_TEXT}>{item.reason}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="pt-1 text-lg text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Contact CTA ----------------------------------------------------- */}
      <section aria-labelledby="service-cta-heading" className="container-site">
        <div className="border-t border-border py-16 md:py-24 md:pb-32">
          <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h2
                id="service-cta-heading"
                className="text-balance text-[length:clamp(2.25rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.5rem,4.6vw,4.5rem)]"
              >
                Tell us about your <em className={ACCENT}>project.</em>
              </h2>
              <p className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:text-lg">
                {service.ctaCopy}
              </p>
            </div>

            <div className="lg:col-span-3 lg:col-start-10 lg:self-end">
              <Link href={CONTACT_HREF} className={PILL}>
                Start a project
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}