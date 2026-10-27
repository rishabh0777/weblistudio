import Link from "next/link";
import ServicesReveal from "./servicesReveal";

/* ==========================================================================
   Webli Studio — Services Overview (Server Component)
   All content is rendered in the initial HTML. Only the thin client wrapper
   (ServicesReveal) handles the scroll-triggered entrance.
   ========================================================================== */

const SERVICES_HREF = "/services";

const DEFAULT_CONTENT = {
  eyebrow: "WHAT WE DO · OUR CAPABILITIES",
  paragraph:
    "From your first online presence to a complete digital experience, we design and develop thoughtful websites that help ambitious brands stand out and grow online.",
  services: [
    {
      title: "Website Design & Development",
      description:
        "Distinctive, responsive websites built around your brand, your audience, and your business goals.",
    },
    {
      title: "E-commerce Development",
      description:
        "Thoughtfully designed online stores that make browsing, product discovery, and purchasing feel effortless.",
    },
    {
      title: "Landing Pages",
      description:
        "Focused, conversion-conscious pages that communicate your value and encourage visitors to take action.",
    },
    {
      title: "Interactive Web Experiences",
      description:
        "Purposeful interactions, refined motion, and distinctive digital experiences that make your website memorable.",
    },
  ],
  cta: { label: "Explore all services", href: SERVICES_HREF },
};

export default function ServicesOverview({ content } = {}) {
  const c = { ...DEFAULT_CONTENT, ...content };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-spacing relative overflow-x-clip"
    >
      <ServicesReveal>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-y-0">
          {/* Introduction */}
          <div className="lg:col-span-5">
            <p
              data-services="eyebrow"
              className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted md:text-xs"
            >
              {c.eyebrow}
            </p>

            <h2
              id="services-heading"
              data-services="heading"
              className="mt-8 text-balance text-[length:clamp(2.25rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.75rem,4.6vw,4.75rem)]"
            >
              Digital solutions, built around{" "}
              <em className="font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]">
                your business.
              </em>
            </h2>

            <p
              data-services="paragraph"
              className="mt-8 max-w-[30rem] text-pretty text-base leading-relaxed text-muted md:text-lg"
            >
              {c.paragraph}
            </p>
          </div>

          {/* Service list */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="border-b border-border">
              {c.services.map((service, i) => (
                <li
                  key={service.title}
                  data-services="row"
                  className="border-t border-border"
                >
                  <Link
                    href={SERVICES_HREF}
                    className="group grid min-h-12 grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-2 py-7 md:gap-x-8 md:py-9"
                  >
                    <span
                      aria-hidden="true"
                      className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-muted md:text-xs"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground md:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-[32rem] text-pretty text-sm leading-relaxed text-muted md:text-base">
                        {service.description}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="pt-1 text-lg text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground group-focus-visible:text-foreground"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <div data-services="cta" className="mt-10 md:mt-12">
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
      </ServicesReveal>
    </section>
  );
}