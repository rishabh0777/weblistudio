import Link from "next/link";

export default function PageCta({
  eyebrow = "HAVE A PROJECT IN MIND?",
  title,
  highlightText,
  description,
}) {
  return (
    <section
      className="py-[5.5rem] sm:py-[8vw] lg:py-22"
      aria-labelledby="page-cta-title"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-[5vw]">
        <p className="m-0 font-mono text-[9px] font-semibold leading-[1.7] tracking-[0.22em] text-[#929292]">
          {eyebrow}
        </p>

        <h2
          id="page-cta-title"
          className="mt-7 mb-0 max-w-[1100px] text-[clamp(3.2rem,9.3vw,8.6rem)] font-semibold leading-[0.86] tracking-[-0.075em] [text-wrap:balance]"
        >
          {title}{" "}
          {highlightText && (
            <em className="webli-footer__headline-em">{highlightText}</em>
          )}
        </h2>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 sm:mt-12">
          <p className="m-0 max-w-[360px] text-xs leading-[1.8] text-[#929292]">
            {description}
          </p>

          <Link
            href="/contact"
            className="group inline-flex min-h-11 items-center justify-between gap-8 rounded-full border border-[#f5f5f5] bg-[#f5f5f5] py-1.5 pr-1.5 pl-[18px] text-[11px] font-semibold text-[#080808] no-underline transition-colors duration-300 hover:bg-transparent hover:text-[#f5f5f5]"
          >
            <span>Start a project</span>

            <span className="grid h-[29px] w-[29px] shrink-0 place-items-center rounded-full bg-[#080808] text-[#f5f5f5] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#f5f5f5] group-hover:text-[#080808]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5 shrink-0"
              >
                <path
                  d="M7 17 17 7M7 7h10v10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}