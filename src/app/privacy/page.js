import Link from "next/link";
import Reveal from "../components/about/aboutReveal";
import PageCta from "../components/layout/footer/pageCTA";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Webli Studio collects, uses and protects the details you share through our project inquiry form.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Webli Studio",
    url: "/privacy",
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

const LABEL =
  "font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted md:text-xs";

const ACCENT =
  "font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]";

const SECTION_TITLE =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground md:text-xs";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "1. Information we collect",
    paragraphs: [
      "When you submit a project inquiry through our contact form, we collect only the details needed to understand your business and what you are looking for: your full name, email address, brand or business name, project type, budget range and project details.",
    ],
  },
  {
    id: "how-we-use-your-data",
    title: "2. How we use your data",
    paragraphs: [
      "We use your information only to communicate with you about your project inquiry. We do not sell, rent or share your personal details with third parties for their own marketing.",
      "We do not keep your inquiry in a long-term database. Once the conversation about your project has taken place, the details are handled as part of that communication.",
    ],
  },
  {
    id: "transmission-and-security",
    title: "3. Transmission and security",
    paragraphs: [
      "Form submissions are processed through a secure third-party email delivery service to notify us of your inquiry. The form also opens a prefilled WhatsApp message so you can continue the conversation directly with us.",
      "All data is transmitted over encrypted HTTPS connections, and we follow standard web security practices. No method of transmission is completely secure, so please share only what is needed to start the conversation.",
    ],
  },
  {
    id: "consent-and-your-rights",
    title: "4. Consent and your rights",
    paragraphs: [
      "By ticking the consent box and submitting the inquiry form, you agree that we may use your details to communicate with you about your project.",
      "You can ask us to correct or delete the information you have shared at any time. Contact us through the details on our contact page and we will respond to your request.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Reveal>
      {/* Hero ------------------------------------------------------------ */}
      <section
        aria-labelledby="privacy-heading"
        className="container-site pb-16 pt-28 md:pb-20 md:pt-36"
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className={`${LABEL} sm:whitespace-nowrap`}>LEGAL · PRIVACY POLICY</p>
          <span
            aria-hidden="true"
            className="h-px w-full bg-border sm:w-auto sm:flex-1"
          />
        </div>

        <h1
          id="privacy-heading"
          className="mt-8 text-balance text-[length:clamp(2.35rem,8vw,4rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(3rem,6.2vw,6.5rem)]"
        >
          Privacy <em className={ACCENT}>&amp; transparency.</em>
        </h1>

        <p className="mt-10 max-w-[34rem] text-pretty text-base leading-relaxed text-muted md:mt-14 md:text-lg">
          This page explains what details we collect when you contact us, how we
          use them and the choices you have. It applies to the project inquiry form
          on this website.
        </p>
      </section>

      {/* Policy sections ------------------------------------------------- */}
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="container-site"
        >
          <div
            data-reveal
            className="grid gap-8 border-t border-border py-14 md:py-20 lg:grid-cols-12 lg:gap-x-8"
          >
            <h2 id={`${section.id}-heading`} className={`${SECTION_TITLE} lg:col-span-4`}>
              {section.title}
            </h2>

            <div className="max-w-[36rem] space-y-6 lg:col-span-7 lg:col-start-6">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-pretty text-base leading-relaxed text-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Modular Page CTA ------------------------------------------------ */}
      <PageCta
        eyebrow="YOUR DATA · YOUR CONTROL"
        title={
          <>
            Questions about <em className={ACCENT}>your data?</em>
          </>
        }
        description="Get in touch and we will help with requests to correct or delete the information you have shared."
        buttonLabel="Back to contact"
        buttonHref="/contact"
      />
    </Reveal>
  );
}