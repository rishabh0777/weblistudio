/* ==========================================================================
   Webli Studio — Principles (single source of truth)

   Used by the home page AboutOverview (title + concise `description`, each row
   links to /about#<slug>) and by the About page (title + `description` +
   expanded `detail`, each rendered as a section with id="<slug>").

   Slugs are stable, unique, lowercase and hyphen-separated. They are element
   IDs on /about, not separate routes. Do not rename them without updating any
   links that point to them.
   ========================================================================== */

export const PRINCIPLES = [
  {
    number: "01",
    slug: "think-beyond-the-brief",
    title: "Think beyond the brief.",
    description:
      "We understand your business, your audience, and the purpose behind every digital decision.",
    detail:
      "A brief describes what is being asked for. We also want to understand the business behind it: who the website is for, what it should help people do, and why each digital decision is being made. That understanding shapes the structure, the message and the design, so the website serves the business and not just a list of requirements.",
  },
  {
    number: "02",
    slug: "make-every-detail-matter",
    title: "Make every detail matter.",
    description:
      "Distinctive typography, considered layouts, and purposeful interactions give your brand its own character.",
    detail:
      "Typography, layout, spacing and interaction all influence how a brand is understood. We give these details real attention so the website has its own character and doesn’t feel like a template. Interactions are used where they serve a purpose, not added for decoration.",
  },
  {
    number: "03",
    slug: "build-for-the-real-world",
    title: "Build for the real world.",
    description:
      "Responsive interfaces, accessible experiences, and performance-conscious development create a stronger online presence.",
    detail:
      "A website has to work for real people on real devices. We build responsive interfaces and accessible experiences, and we develop with performance in mind, so the finished site gives your business a stronger online presence.",
  },
];

export const aboutAnchor = (slug) => `/about#${slug}`;