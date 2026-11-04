import Link from "next/link";
import AboutReveal from "../components/about/aboutReveal";
import { PRINCIPLES } from "../components/about/principles";

/* ==========================================================================
   Webli Studio — About (Server Component)
   All content is rendered in the initial HTML. Only the thin client wrapper
   (AboutReveal) handles the scroll-triggered entrance, and the hero is not
   animated so the H1 is visible from first paint.

   Section anchors: each principle and each process stage is a section of this
   page with its own element ID (e.g. /about#think-beyond-the-brief). These are
   in-page links, not separate routes or indexable pages. Principle IDs come
   from components/about/principles.js, which the home page AboutOverview also
   uses for its links. `scroll-mt-6` adds breathing room on top of the
   `scroll-padding-top` already set on <html>, so targets clear the header.

   Internal links: only routes that exist are linked (/contact).

   Metadata note: Next.js replaces (does not deep-merge) `openGraph` and
   `twitter` from the root layout, so both are fully specified here, including
   the image, to avoid inheriting the home page's URL and title.
   ========================================================================== */

const TITLE = "About Our Web Design & Development Studio";
const DESCRIPTION =
  "Webli Studio is an independent web design and development studio founded by Rishabh Srivastava. See our principles and how we work, from first brief to launch.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Webli Studio",
    url: "/about",
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

const PORTFOLIO_URL = "https://rishabhsrivastava.vercel.app/";

const CONTENT = {
  hero: {
    eyebrow: "ABOUT WEBLI STUDIO",
    copy: "Webli Studio is an independent web design and development studio founded by Rishabh Srivastava. We help businesses create clear, thoughtful digital experiences—from focused landing pages to complete business websites.",
    facts: [
      { term: "Founded by", detail: "Rishabh Srivastava" },
      {
        term: "Focus",
        detail: "Landing pages, business websites and e-commerce websites",
      },
      {
        term: "Way of working",
        detail: "Remote, with businesses and founders",
      },
    ],
  },
  founder: {
    label: "THE FOUNDER",
    title: "The person behind the studio",
    copy: "I’m Rishabh Srivastava, founder of Webli Studio and a full-stack web developer. I bring design and development together to build websites that communicate a brand’s value clearly and make it easier for people to take the next step.",
    link: "Explore Rishabh’s portfolio",
  },
  work: {
    label: "WHAT WE DO",
    title: "Websites shaped around the business",
    copy: "We design and develop landing pages, business websites, and e-commerce experiences. Every project begins with understanding the business, its audience, and the purpose of the website—then turning that into a considered design and a responsive build.",
    offerings: ["Landing pages", "Business websites", "E-commerce websites"],
  },
  principles: {
    label: "OUR PRINCIPLES / 001—003",
    title: "Principles behind the work",
    copy: "Three ideas guide how we approach every website, from the first conversation to the final interaction.",
  },
  process: {
    label: "OUR PROCESS / 001—003",
    title: "How we work",
    copy: "Every project moves through the same three stages, so you always know where it stands.",
    steps: [
      {
        slug: "understand-the-project",
        title: "Understand",
        description:
          "Clarify the business, audience, goals, and project scope.",
        detail:
          "We start by learning about the business: what it does, who the website is for and what it needs to achieve. Then we agree the scope of the project, so the website is planned around clear goals rather than assumptions.",
      },
      {
        slug: "design-the-experience",
        title: "Design",
        description:
          "Create a visual direction and page structure that make the brand and its message easy to understand.",
        detail:
          "Once the goals are clear, we shape the visual direction and plan the page structure. Typography, layout and spacing are considered together, so the brand and its message are easy to understand at a glance.",
      },
      {
        slug: "build-and-launch",
        title: "Build",
        description:
          "Develop a responsive website, test key interactions, and prepare it for launch.",
        detail:
          "We develop the website from the agreed design and make sure it is responsive across screen sizes. Key interactions are tested, and the site is prepared for launch.",
      },
    ],
  },
  remote: {
    label: "WORKING INTERNATIONALLY",
    copy: "Webli Studio works remotely with businesses and founders. Share your goals, audience, and project requirements, and we’ll discuss whether we’re the right fit for your project.",
  },
  cta: {
    title: "Let’s build something that moves your business forward.",
    copy: "Tell us what you’re working on and what you need your website to do.",
    label: "Start a project",
    href: "/contact",
  },
};

const LABEL =
  "font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted md:text-xs";

const H2 =
  "mt-6 text-balance text-[length:clamp(2.25rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.5rem,4.2vw,4rem)]";

const ACCENT =
  "font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]";

const BODY =
  "max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:text-lg";

const SECTION = "border-t border-border py-16 md:py-24";

const ITEM_TITLE =
  "text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground md:text-2xl";

const ITEM_TEXT =
  "mt-3 max-w-[32rem] text-pretty text-sm leading-relaxed text-muted md:text-base";

export default function AboutPage() {
  const { hero, founder, work, principles, process, remote, cta } = CONTENT;

  return (
    <AboutReveal>
      {/* Hero ------------------------------------------------------------ */}
      <section
        aria-labelledby="about-heading"
        className="container-site pb-16 pt-28 md:pb-24 md:pt-36"
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className={`${LABEL} sm:whitespace-nowrap`}>{hero.eyebrow}</p>
          <span
            aria-hidden="true"
            className="h-px w-full bg-border sm:w-auto sm:flex-1"
          />
        </div>

        <h1
          id="about-heading"
          className="mt-8 text-balance text-[length:clamp(2.35rem,9.5vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(3rem,6.2vw,6.5rem)]"
        >
          <span className="block">Independent by design.</span>{" "}
          <span className="block">
            Built for <em className={ACCENT}>ambitious brands.</em>
          </span>
        </h1>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-8">
          <p className={`${BODY} lg:col-span-5`}>{hero.copy}</p>

          <dl className="border-b border-border lg:col-span-6 lg:col-start-7">
            {hero.facts.map((fact) => (
              <div
                key={fact.term}
                className="grid gap-1 border-t border-border py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
              >
                <dt className={LABEL}>{fact.term}</dt>
                <dd className="text-sm leading-relaxed text-foreground md:text-base">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Founder --------------------------------------------------------- */}
      <section aria-labelledby="founder-heading" className="container-site">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div data-reveal className="lg:col-span-5">
              <p className={LABEL}>{founder.label}</p>
              <h2 id="founder-heading" className={H2}>
                {founder.title}
              </h2>
            </div>

            <div data-reveal className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-[40rem] text-pretty text-[length:clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.02em] text-foreground">
                {founder.copy}
              </p>

              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener"
                className="group mt-8 inline-flex min-h-11 items-center gap-4 border-b border-border pb-2 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                <span>{founder.link}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What we do ------------------------------------------------------ */}
      <section aria-labelledby="work-heading" className="container-site">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div data-reveal className="lg:col-span-5">
              <p className={LABEL}>{work.label}</p>
              <h2 id="work-heading" className={H2}>
                {work.title}
              </h2>
            </div>

            <div data-reveal className="lg:col-span-6 lg:col-start-7">
              <p className={BODY}>{work.copy}</p>

              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:gap-x-10">
                {work.offerings.map((offering) => (
                  <li key={offering}>{offering}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principles ------------------------------------------------------ */}
      <section aria-labelledby="principles-heading" className="container-site">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div data-reveal className="lg:col-span-5">
              <p className={LABEL}>{principles.label}</p>
              <h2 id="principles-heading" className={H2}>
                {principles.title}
              </h2>
              <p className={`${BODY} mt-6`}>{principles.copy}</p>
            </div>

            <ol className="border-b border-border lg:col-span-6 lg:col-start-7">
              {PRINCIPLES.map((principle) => (
                <li
                  key={principle.slug}
                  id={principle.slug}
                  data-reveal
                  className="grid scroll-mt-6 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 border-t border-border py-7 md:gap-x-8 md:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-muted md:text-xs"
                  >
                    {principle.number}
                  </span>

                  <div>
                    <h3 className={ITEM_TITLE}>{principle.title}</h3>
                    <p className={ITEM_TEXT}>{principle.description}</p>
                    <p className={ITEM_TEXT}>{principle.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* How we work ----------------------------------------------------- */}
      <section aria-labelledby="process-heading" className="container-site">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div data-reveal className="lg:col-span-5">
              <p className={LABEL}>{process.label}</p>
              <h2 id="process-heading" className={H2}>
                {process.title}
              </h2>
              <p className={`${BODY} mt-6`}>{process.copy}</p>
            </div>

            <ol className="border-b border-border lg:col-span-6 lg:col-start-7">
              {process.steps.map((step, i) => (
                <li
                  key={step.slug}
                  id={step.slug}
                  data-reveal
                  className="grid scroll-mt-6 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 border-t border-border py-7 md:gap-x-8 md:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-muted md:text-xs"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className={ITEM_TITLE}>{step.title}</h3>
                    <p className={ITEM_TEXT}>{step.description}</p>
                    <p className={ITEM_TEXT}>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Working internationally ---------------------------------------- */}
      <section aria-labelledby="remote-heading" className="container-site">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div data-reveal className="lg:col-span-7">
              <p className={LABEL}>{remote.label}</p>
              <h2 id="remote-heading" className={H2}>
                One studio. <em className={ACCENT}>Wherever you’re building.</em>
              </h2>
            </div>

            <p data-reveal className={`${BODY} lg:col-span-4 lg:col-start-9`}>
              {remote.copy}
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA ----------------------------------------------------- */}
      <section aria-labelledby="cta-heading" className="container-site">
        <div className={`${SECTION} md:pb-32`}>
          <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h2
                id="cta-heading"
                className="text-balance text-[length:clamp(2.25rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground md:text-[length:clamp(2.5rem,4.6vw,4.5rem)]"
              >
                {cta.title}
              </h2>
              <p className={`${BODY} mt-6`}>{cta.copy}</p>
            </div>

            <div className="lg:col-span-3 lg:col-start-10 lg:self-end">
              <Link
                href={cta.href}
                className="group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground"
              >
                {cta.label}
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
    </AboutReveal>
  );
}