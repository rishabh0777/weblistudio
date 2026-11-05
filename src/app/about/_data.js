/* ==========================================================================
   Webli Studio — About principles (single source of truth)

   Used by:
   - the home page AboutOverview (title + short `description`, links to the
     principle's own page)
   - the /about page (title + `description` + `detail`, links to the same page)
   - the /about/[principleSlug] detail pages (everything below)

   Slugs are stable, unique, lowercase and hyphen-separated. Each one is a real
   route: /about/<slug>.

   Content rules: no client results, testimonials, statistics, awards or
   guarantees. Statements about how Webli Studio works are limited to the
   documented three-stage process on /about (Understand, Design, Build).
   ========================================================================== */

export const SITE_URL = "https://webli.vercel.app";

export const principlePath = (slug) => `/about/${slug}`;

export const PRINCIPLES = [
  /* 01 ---------------------------------------------------------------- */
  {
    slug: "think-beyond-the-brief",
    number: "01",
    title: "Think beyond the brief.",
    description:
      "We understand your business, your audience, and the purpose behind every digital decision.",
    detail:
      "A brief describes what is being asked for. We also want to understand the business behind it: who the website is for, what it should help people do, and why each digital decision is being made. That understanding shapes the structure, the message and the design, so the website serves the business and not just a list of requirements.",
    metaTitle: "Think Beyond the Brief in Web Design",
    metaDescription:
      "How Webli Studio looks beyond the initial brief to understand a business, its audience and its goals before designing and building a website.",
    eyebrow: "PRINCIPLE 01 / 003",
    heading: { before: "Think beyond", accent: "the brief." },
    intro:
      "A brief tells us what a client wants built. It rarely tells us why, who it is for, or what the website needs to do for the business. This principle is about asking those questions first, because the answers decide whether the finished website works.",
    sections: [
      {
        title: "What it means to look beyond the brief",
        paragraphs: [
          "A brief is usually a starting point: a list of pages, a few reference websites, a rough sense of style. All of that is useful, but it describes the website, not the business that needs it.",
          "Looking beyond it means understanding what the business does, who it is trying to reach, how those people make decisions and what the website should help them do. Only then can the pages, the message and the design be planned with a purpose.",
        ],
      },
      {
        title: "Why goals, audience and behaviour come before design",
        items: [
          {
            title: "Business goals",
            text: "A website meant to generate enquiries is planned differently from one that sells products or explains a complex service. The goal tells us what the main action is and what should support it.",
          },
          {
            title: "Audience needs",
            text: "Visitors arrive with questions. What they need to know, in what order, and what might make them hesitate all shape the structure and wording of every page.",
          },
          {
            title: "Customer behaviour",
            text: "People scan, compare and often browse on a phone. Understanding how your customers actually look and decide helps us prioritise what appears first and what can wait.",
          },
        ],
      },
      {
        title: "How it shapes the website",
        items: [
          {
            title: "Structure",
            text: "Pages and navigation are organised around what visitors are trying to do, not around how the business is organised internally.",
          },
          {
            title: "Messaging",
            text: "Headlines and copy lead with what matters to the visitor, and each page points to one clear next step.",
          },
          {
            title: "Design",
            text: "Visual decisions follow the message and the audience, so the design supports understanding instead of only looking good.",
          },
          {
            title: "Development",
            text: "Technical choices, from how pages are built to which interactions are included, serve the goals agreed at the start.",
          },
        ],
      },
      {
        title: "Mistakes that come from focusing only on appearance",
        items: [
          {
            title: "Choosing a style before the message is clear",
            text: "A polished layout can’t fix a page that doesn’t say who it is for or what to do next.",
          },
          {
            title: "Copying references",
            text: "A reference shows what worked for another business. It doesn’t show whether it suits yours.",
          },
          {
            title: "Treating every page as equally important",
            text: "Without priorities, everything competes for attention and visitors can miss the main action.",
          },
          {
            title: "Planning for desktop only",
            text: "Visitors may see the website on a phone first, which changes what needs to come first.",
          },
        ],
      },
      {
        title: "How we apply it at Webli Studio",
        paragraphs: [
          "This principle is built into our process. The first stage, Understand, is spent clarifying the business, the audience, the goals and the scope of the project before design begins. What we learn there carries into the design and build stages, so decisions can be traced back to the purpose of the website.",
          "It also means we may ask questions that go beyond the brief, and we may suggest changes to the scope when they would better serve your goals. The decisions remain yours.",
        ],
        link: {
          href: "/about#understand-the-project",
          label: "See the Understand stage of our process",
        },
      },
    ],
    relatedPrinciples: ["make-every-detail-matter", "build-for-the-real-world"],
    relatedServices: [
      {
        href: "/services/website-design-development",
        title: "Website Design & Development",
        reason:
          "Where this principle starts: planning a complete website around your goals.",
      },
      {
        href: "/services/website-redesigns",
        title: "Website Redesigns",
        reason:
          "Reviewing an existing website against what the business needs it to do now.",
      },
    ],
    ctaCopy:
      "Tell us about your business, your audience and what you need your website to do. We’ll start from there, not from a list of pages.",
  },

  /* 02 ---------------------------------------------------------------- */
  {
    slug: "make-every-detail-matter",
    number: "02",
    title: "Make every detail matter.",
    description:
      "Distinctive typography, considered layouts, and purposeful interactions give your brand its own character.",
    detail:
      "Typography, layout, spacing and interaction all influence how a brand is understood. We give these details real attention so the website has its own character and doesn’t feel like a template. Interactions are used where they serve a purpose, not added for decoration.",
    metaTitle: "Make Every Detail Matter in Web Design",
    metaDescription:
      "Why typography, layout, spacing and purposeful interaction matter in web design, and how Webli Studio gives every detail attention.",
    eyebrow: "PRINCIPLE 02 / 003",
    heading: { before: "Make every detail", accent: "matter." },
    intro:
      "Most visitors will never consciously notice the spacing between two lines of text or the way a button responds when they hover over it. They do feel the difference when details are handled with care, and it shapes how a brand is perceived.",
    sections: [
      {
        title: "Details are how a brand is understood",
        paragraphs: [
          "A website is the sum of many small decisions: the typeface, the size and spacing of text, the structure of a layout, the way elements respond to interaction. Together they say something about the business, whether or not anyone intended them to.",
          "That is why we treat these decisions as part of the brand rather than as finishing touches.",
        ],
      },
      {
        title: "The details we pay attention to",
        items: [
          {
            title: "Typography",
            text: "Typeface, size, weight and line length affect how readable a page is and what tone it carries.",
          },
          {
            title: "Layout and spacing",
            text: "Consistent spacing and a clear hierarchy guide the eye and make pages easier to scan.",
          },
          {
            title: "Purposeful interaction",
            text: "Hover states, transitions and motion are used to give feedback or direct attention, not as decoration.",
          },
          {
            title: "Consistency",
            text: "Components behave the same way across pages, so the website feels like one coherent whole.",
          },
        ],
      },
      {
        title: "Distinctive doesn’t mean complicated",
        paragraphs: [
          "Giving a brand its own character doesn’t require more effects. Often it means fewer, better-chosen decisions: a typographic voice that suits the business, a layout with room to breathe and interactions that are restrained.",
          "Where motion is used, it should respect visitors who prefer reduced movement and never get in the way of the content.",
        ],
      },
      {
        title: "Common ways details get lost",
        items: [
          {
            title: "Relying on a template and changing the colours",
            text: "A template can be quick, but it gives different businesses the same look.",
          },
          {
            title: "Adding effects for their own sake",
            text: "Animation that doesn’t help anyone understand something adds weight and distraction.",
          },
          {
            title: "Inconsistent details",
            text: "Mismatched spacing, button styles or type sizes make a website feel unfinished even when the content is good.",
          },
          {
            title: "Leaving polish until the end",
            text: "Details left to the final days of a project are often the first thing to be cut.",
          },
        ],
      },
      {
        title: "How we apply it at Webli Studio",
        paragraphs: [
          "In the Design stage of our process, we shape a visual direction and page structure around the brand and its message. Typography, layout and spacing are considered together, and interactions are included where they serve a purpose.",
          "During the build, we test key interactions and check that the details of the design carry through into the finished, responsive website.",
        ],
        link: {
          href: "/about#design-the-experience",
          label: "See the Design stage of our process",
        },
      },
    ],
    relatedPrinciples: ["think-beyond-the-brief", "build-for-the-real-world"],
    relatedServices: [
      {
        href: "/services/interactive-web-experiences",
        title: "Interactive Web Experiences",
        reason:
          "Purposeful motion and interaction, designed around your content.",
      },
      {
        href: "/services/website-design-development",
        title: "Website Design & Development",
        reason:
          "A custom design for a complete website, built to match.",
      },
    ],
    ctaCopy:
      "Tell us about your brand and the impression you want your website to make. We’ll help you decide where the details matter most.",
  },

  /* 03 ---------------------------------------------------------------- */
  {
    slug: "build-for-the-real-world",
    number: "03",
    title: "Build for the real world.",
    description:
      "Responsive interfaces, accessible experiences, and performance-conscious development create a stronger online presence.",
    detail:
      "A website has to work for real people on real devices. We build responsive interfaces and accessible experiences, and we develop with performance in mind, so the finished site gives your business a stronger online presence.",
    metaTitle: "Build Websites for the Real World",
    metaDescription:
      "How Webli Studio builds responsive, accessible and performance-conscious websites designed to work for real people on real devices.",
    eyebrow: "PRINCIPLE 03 / 003",
    heading: { before: "Build for", accent: "the real world." },
    intro:
      "A website is judged in the conditions people actually use it in: on different screens and connections, with different needs and different habits. Building for the real world means designing and developing for those conditions from the start, not discovering them after launch.",
    sections: [
      {
        title: "What the real world looks like",
        paragraphs: [
          "Visitors use phones, tablets, laptops and large monitors. They browse with a mouse, a touchscreen or a keyboard. Some use assistive technology, some are on slow connections, and plenty are simply in a hurry.",
          "A website that only works well on the designer’s own screen leaves some of those visitors behind.",
        ],
      },
      {
        title: "What we build in from the start",
        items: [
          {
            title: "Responsive interfaces",
            text: "Layouts are designed and built to adapt across screen sizes, rather than being shrunk down from a desktop design.",
          },
          {
            title: "Accessible experiences",
            text: "We consider how people with different abilities and tools will use the site, including readable text, a clear structure, labelled controls and keyboard use.",
          },
          {
            title: "Performance-conscious development",
            text: "We keep pages lightweight and avoid effects and dependencies that don’t earn their place, so the site stays quick to use.",
          },
        ],
      },
      {
        title: "Why it matters for a business",
        paragraphs: [
          "A website that is hard to use on a phone, difficult to read or slow to load makes it harder for people to understand and contact a business. Responsive, accessible and efficient builds remove those barriers, which supports a stronger online presence.",
          "Search engines also work from a page’s structure and content, so clear, well-built pages are easier for them to understand. That doesn’t guarantee rankings, but it removes technical obstacles.",
        ],
      },
      {
        title: "Common ways websites fall short",
        items: [
          {
            title: "Designing only for desktop",
            text: "Small-screen layouts that are an afterthought are usually the hardest to use.",
          },
          {
            title: "Treating accessibility as an add-on",
            text: "Fixing accessibility after a design is finished is harder than designing for it from the start.",
          },
          {
            title: "Letting animation and scripts pile up",
            text: "Each effect and dependency has a cost. Unchecked, they slow the site down for everyone.",
          },
          {
            title: "Testing on a single device",
            text: "A site can look right on one screen and fail on another.",
          },
        ],
      },
      {
        title: "How we apply it at Webli Studio",
        paragraphs: [
          "The Build stage of our process produces a responsive website, tests key interactions and prepares the site for launch. Responsiveness, accessibility and performance are considered as part of the build rather than added afterwards.",
        ],
        link: {
          href: "/about#build-and-launch",
          label: "See the Build stage of our process",
        },
      },
    ],
    relatedPrinciples: ["think-beyond-the-brief", "make-every-detail-matter"],
    relatedServices: [
      {
        href: "/services/website-design-development",
        title: "Website Design & Development",
        reason:
          "Responsive, accessible websites built around your goals.",
      },
      {
        href: "/services/website-maintenance-support",
        title: "Website Maintenance & Support",
        reason:
          "Keeping a website running smoothly after it launches.",
      },
    ],
    ctaCopy:
      "Tell us about your website and the people who use it. We’ll help you work out what it needs to work well for them.",
  },
];

export function getPrincipleBySlug(slug) {
  return PRINCIPLES.find((principle) => principle.slug === slug);
}