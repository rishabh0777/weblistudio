import ContactReveal from "../components/contact/contactReveal";
import ContactForm from "../components/contact/contactForm";
import {
  GENERAL_MESSAGE,
  INSTAGRAM_URL,
  hasWhatsApp,
  whatsappHref,
} from "../components/contact/contactConfig";

/* ==========================================================================
   Webli Studio — Contact (Server Component)
   All static content is rendered in the initial HTML. Two small client
   components handle behaviour: ContactReveal (entrance animation) and
   ContactForm (validation + WhatsApp hand-off).

   The WhatsApp number lives in app/components/contact/contactConfig.js
   (see the TODO(WEBLI) there; it is empty until the real number is added).
   ========================================================================== */

const primaryHref = hasWhatsApp ? whatsappHref(GENERAL_MESSAGE) : INSTAGRAM_URL;
const primaryLabel = hasWhatsApp
  ? "Message us on WhatsApp"
  : "Message us on Instagram";

const ANIM = "contact-anim opacity-0 motion-reduce:opacity-100";

const DEFAULT_CONTENT = {
  eyebrow: "CONTACT · START A PROJECT",
  paragraph:
    "Whether you’re launching your first website or rebuilding an existing one, tell us about your project. Fill in the form and your details will be ready to send on WhatsApp.",
  directLabel: "PREFER TO CHAT DIRECTLY?",
  formLabel: "PROJECT INQUIRY / START HERE",
  intro: {
    title: "Website design and development for growing businesses",
    body: "Webli Studio helps startups, small businesses, and growing brands build professional websites—from landing pages to business and e-commerce websites. We work with clients across India, with a focus on clear communication, thoughtful design, and reliable development.",
  },
  area: {
    title: "Serving businesses across India",
    body: "We work remotely with businesses across India. Share your project details and we’ll get back to you to discuss the right approach for your website.",
  },
  detail: "DESIGN-LED. DEVELOPMENT-DRIVEN.",
};

export default function ContactPage() {
  const c = DEFAULT_CONTENT;

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-x-clip"
    >
      <ContactReveal className="container-site pb-16 pt-28 md:pb-24 md:pt-36">
        {/* Eyebrow + animated rule */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p
            data-contact="eyebrow"
            className={`${ANIM} font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted sm:whitespace-nowrap md:text-xs`}
          >
            {c.eyebrow}
          </p>
          <span
            data-contact="rule"
            aria-hidden="true"
            className={`${ANIM} h-px w-full bg-border sm:w-auto sm:flex-1`}
          />
        </div>

        {/* Headline */}
        <h1
          id="contact-heading"
          className="mt-8 text-balance text-[length:clamp(2.35rem,9.5vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-foreground md:mt-12 md:text-[length:clamp(3rem,6.2vw,6.5rem)]"
        >
          <span className="block">Tell us what</span>
          <span className="block">
            you’re{" "}
            <em className="font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]">
              building.
            </em>
          </span>
        </h1>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-y-0">
          {/* Left column on desktop. On mobile the wrapper disappears
              (`contents`) so the studio intro can sit below the form. */}
          <div className="contents lg:col-span-5 lg:block">
            {/* Copy + direct contact options */}
            <div className="order-1 lg:order-none">
              <p
                data-contact="paragraph"
                className={`${ANIM} max-w-[30rem] text-pretty text-base leading-relaxed text-muted md:text-lg`}
              >
                {c.paragraph}
              </p>

              <p
                data-contact="cta"
                className={`${ANIM} mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:text-xs`}
              >
                {c.directLabel}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a
                  data-contact="cta"
                  href={primaryHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`${ANIM} group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground`}
                >
                  {primaryLabel}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>

                {hasWhatsApp && (
                  <a
                    data-contact="cta"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`${ANIM} group inline-flex min-h-12 items-center gap-3 text-sm font-medium text-foreground`}
                  >
                    <span className="border-b border-border pb-0.5 transition-colors duration-300 group-hover:border-foreground">
                      Or find us on Instagram
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                )}
              </div>

              {!hasWhatsApp && process.env.NODE_ENV !== "production" && (
                <p className="mt-6 max-w-[30rem] border border-dashed border-border p-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                  Placeholder: set WHATSAPP_NUMBER in
                  app/components/contact/contactConfig.js. This note is shown in
                  development only.
                </p>
              )}
            </div>

            {/* Studio intro + service area (compact, text only) */}
            <div
              data-contact="intro"
              className={`${ANIM} order-3 border-t border-border pt-8 lg:order-none lg:mt-16`}
            >
              <h2 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground md:text-2xl">
                {c.intro.title}
              </h2>
              <p className="mt-3 max-w-[32rem] text-pretty text-sm leading-relaxed text-muted md:text-base">
                {c.intro.body}
              </p>

              <h2 className="mt-8 text-base font-semibold leading-tight tracking-[-0.02em] text-foreground md:text-lg">
                {c.area.title}
              </h2>
              <p className="mt-2 max-w-[32rem] text-pretty text-sm leading-relaxed text-muted md:text-base">
                {c.area.body}
              </p>
            </div>
          </div>

          {/* Inquiry form */}
          <div className="order-2 lg:order-none lg:col-span-6 lg:col-start-7">
            <h2 className="mb-6 border-t border-border pt-5 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-muted md:text-xs">
              {c.formLabel}
            </h2>

            <ContactForm />
          </div>
        </div>

        {/* Detail line */}
        <p
          data-contact="detail"
          className={`${ANIM} mt-16 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:mt-20`}
        >
          {c.detail}
        </p>
      </ContactReveal>
    </section>
  );
}