import Link from "next/link";
import AboutReveal from "@/app/components/about/aboutReveal";
import {
  SITE_URL,
  getPrincipleBySlug,
  principlePath,
} from "@/app/about/_data";

/* ==========================================================================
   Webli Studio — About principle detail page (Server Component)
   All content is rendered in the initial HTML. The only client code is the
   shared AboutReveal wrapper (one-time scroll entrance, reduced-motion aware).
   The hero is not tagged `data-reveal`, so the H1 is visible from first paint.

   Structured data: Article (no dates, ratings or other unsupported fields)
   plus BreadcrumbList. Content comes from app/about/_data.js.
   ========================================================================== */

const CONTACT_HREF = "/contact";
const ABOUT_HREF = "/about";

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

function Section({ id, label, title, children }) {
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
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  );
}

function ItemList({ items }) {
  return (
    <ul className="border-b border-border">
      {items.map((item) => (
        <li key={item.title} className="border-t border-border py-6 md:py-7">
          <h3 className={ITEM_TITLE}>{item.title}</h3>
          <p className={ITEM_TEXT}>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function buildJsonLd(principle) {
  const url = `${SITE_URL}${principlePath(principle.slug)}`;
  const organization = {
    "@type": "Organization",
    name: "Webli Studio",
    url: SITE_URL,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: principle.metaTitle,
        description: principle.metaDescription,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: `${SITE_URL}/og.png`,
        inLanguage: "en",
        author: organization,
        publisher: organization,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${SITE_URL}${ABOUT_HREF}`,
          url: `${SITE_URL}${ABOUT_HREF}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${SITE_URL}${ABOUT_HREF}`,
          },
          { "@type": "ListItem", position: 3, name: principle.title, item: url },
        ],
      },
    ],
  };
}

export default function PrincipleDetail({ slug }) {
  const principle = getPrincipleBySlug(slug);
  if (!principle) return null;

  const related = principle.relatedPrinciples
    .map((relatedSlug) => getPrincipleBySlug(relatedSlug))
    .filter(Boolean);

  // "<" is escaped so the JSON can never close the script tag early.
  const jsonLd = JSON.stringify(buildJsonLd(principle)).replace(/</g, "\\u003c");

  return (
    <AboutReveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Hero ------------------------------------------------------------ */}
      <section
        aria-labelledby="principle-heading"
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
                href={ABOUT_HREF}
                className="transition-colors duration-300 hover:text-foreground"
              >
                About
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {principle.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className={`${LABEL} sm:whitespace-nowrap`}>{principle.eyebrow}</p>
          <span
            aria-hidden="true"
            className="h-px w-full bg-border sm:w-auto sm:flex-1"
          />
        </div>

        <h1
          id="principle-heading"
          className="mt-8 text-balance text-[length:clamp(2.35rem,9vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(3rem,6.2vw,6.5rem)]"
        >
          {principle.heading.before}{" "}
          <em className={ACCENT}>{principle.heading.accent}</em>
        </h1>

        <p className="mt-10 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:mt-14 md:text-lg">
          {principle.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={CONTACT_HREF} className={PILL}>
            Start a project
            <Arrow />
          </Link>
          <Link
            href={ABOUT_HREF}
            className="inline-flex min-h-12 items-center text-sm text-muted underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
          >
            Back to About Webli Studio
          </Link>
        </div>
      </section>

      {/* Editorial sections ---------------------------------------------- */}
      {principle.sections.map((section, i) => (
        <Section
          key={section.title}
          id={`part-${i + 1}`}
          label={`${String(i + 1).padStart(2, "0")} / ${String(
            principle.sections.length,
          ).padStart(2, "0")}`}
          title={section.title}
        >
          {section.paragraphs ? (
            <div className="max-w-[36rem] space-y-6">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-pretty text-base leading-relaxed text-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {section.items ? <ItemList items={section.items} /> : null}

          {section.link ? (
            <Link
              href={section.link.href}
              className="group mt-8 inline-flex min-h-12 items-center gap-3 text-sm font-medium text-foreground"
            >
              <span className="border-b border-border pb-0.5 transition-colors duration-300 group-hover:border-foreground">
                {section.link.label}
              </span>
              <Arrow />
            </Link>
          ) : null}
        </Section>
      ))}

      {/* Related principles ---------------------------------------------- */}
      {related.length > 0 ? (
        <Section
          id="related-principles"
          label="Keep reading"
          title="Our other principles"
        >
          <ul className="border-b border-border">
            {related.map((item) => (
              <li key={item.slug} className="border-t border-border">
                <Link
                  href={principlePath(item.slug)}
                  className="group grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 py-6 md:py-7"
                >
                  <div>
                    <h3 className={ITEM_TITLE}>{item.title}</h3>
                    <p className={ITEM_TEXT}>{item.description}</p>
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

      {/* Related services ------------------------------------------------ */}
      {principle.relatedServices.length > 0 ? (
        <Section
          id="related-services"
          label="Related services"
          title="Where this shows up in our services"
        >
          <ul className="border-b border-border">
            {principle.relatedServices.map((service) => (
              <li key={service.href} className="border-t border-border">
                <Link
                  href={service.href}
                  className="group grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 py-6 md:py-7"
                >
                  <div>
                    <h3 className={ITEM_TITLE}>{service.title}</h3>
                    <p className={ITEM_TEXT}>{service.reason}</p>
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
      <section aria-labelledby="principle-cta-heading" className="container-site">
        <div className="border-t border-border py-16 md:py-24 md:pb-32">
          <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h2
                id="principle-cta-heading"
                className="text-balance text-[length:clamp(2.25rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.5rem,4.6vw,4.5rem)]"
              >
                Tell us about your <em className={ACCENT}>project.</em>
              </h2>
              <p className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:text-lg">
                {principle.ctaCopy}
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
    </AboutReveal>
  );
}