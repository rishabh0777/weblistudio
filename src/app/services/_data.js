/* ==========================================================================
   Webli Studio — Service detail content

   One entry per service. Slugs match the links on the Services overview page
   exactly (/services/<slug>). This file is plain data: the page template is
   app/components/services/serviceDetail.jsx.

   Content rules followed here: no prices, delivery timelines, guarantees,
   client results, statistics, testimonials or business locations.
   ========================================================================== */

export const SITE_URL = "https://webli.vercel.app";

const SCOPE_FAQ = {
  q: "How long will a project take, and what will it cost?",
  a: "Both depend on the scope: the number of pages, how much custom design is involved and what content is ready. We don’t publish fixed prices or timelines because they would be guesses. Tell us about your project through the contact page and we’ll discuss what it involves.",
};

export const SERVICE_DETAILS = [
  /* 1 ------------------------------------------------------------------ */
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    metaTitle: "Custom Website Design & Development",
    metaDescription:
      "Custom website design and development for businesses and founders: responsive, accessible multi-page websites built around your brand, audience and goals.",
    eyebrow: "SERVICES · WEBSITE DESIGN & DEVELOPMENT",
    h1: {
      before: "Website design and development, built around",
      accent: "your business.",
    },
    intro:
      "For many businesses, the website is where a potential customer decides whether to trust them. We design and develop complete, multi-page websites that explain what you do clearly, work well on every screen size and give visitors an obvious next step.",
    overview: [
      "This service is for businesses that need a full website rather than a single page: a home page, service or product pages, an about page, a way to get in touch and whatever else your customers need to make a decision.",
      "We handle design and development together. The layout, typography and content structure are planned with the build in mind, so what is designed is what ships, and the finished site is fast to load, accessible and straightforward to maintain.",
    ],
    problems: {
      title: "Problems a well-built website solves",
      items: [
        {
          title: "Visitors can’t tell what you do",
          text: "Unclear messaging sends people back to the search results. We structure each page so your offer, your audience and the next step are clear within moments.",
        },
        {
          title: "The site works on desktop but not on a phone",
          text: "Layouts are designed and tested for mobile, tablet and desktop from the start rather than adapted at the end.",
        },
        {
          title: "Search engines struggle to understand the pages",
          text: "Clean semantic markup, a sensible heading structure, unique titles and descriptions and logical internal links give search engines a clear picture of each page.",
        },
        {
          title: "Updating the website is a struggle",
          text: "We build with maintainable code and a clear structure, so a content change doesn’t turn into a rebuild.",
        },
        {
          title: "The website doesn’t feel like your business",
          text: "Generic templates make different businesses look the same. We design around your brand so the site feels like yours.",
        },
      ],
    },
    deliverables: {
      title: "What you receive",
      items: [
        {
          title: "A custom, responsive design",
          text: "Layouts, typography and colour tailored to your brand and applied consistently across every page.",
        },
        {
          title: "Multi-page development",
          text: "Production-ready pages built for your content, from home and services to about and contact.",
        },
        {
          title: "A planned page and navigation structure",
          text: "A structure organised around what your visitors are looking for, not around your internal org chart.",
        },
        {
          title: "Technical SEO foundations",
          text: "Page titles, meta descriptions, canonical URLs, semantic HTML and structured data set up on each page.",
        },
        {
          title: "Accessibility basics",
          text: "Readable contrast, keyboard-friendly navigation, descriptive links and labelled form fields.",
        },
        {
          title: "A clear path to contact you",
          text: "Calls to action and a contact route, so interested visitors can reach you without hunting for it.",
        },
      ],
    },
    extra: {
      title: "Pages most business websites include",
      intro:
        "The right structure depends on your business, but most complete websites are built from a few core pages.",
      items: [
        {
          title: "Home",
          text: "Explains what you do, who it is for and where to go next.",
        },
        {
          title: "Service or product pages",
          text: "Give each offer its own page so visitors, and search engines, can understand it properly.",
        },
        {
          title: "About",
          text: "Builds trust by explaining who is behind the business and how you work.",
        },
        {
          title: "Contact",
          text: "Makes it easy to start a conversation, whichever method you prefer to use.",
        },
      ],
    },
    process: {
      title: "How we approach it",
      steps: [
        {
          title: "Understand",
          text: "We start with your business, your audience and what the website needs to achieve, then agree the pages and priorities.",
        },
        {
          title: "Structure",
          text: "We plan page structure, navigation and content hierarchy before any visual design begins.",
        },
        {
          title: "Design",
          text: "We shape the look and feel around your brand, with attention to typography, spacing and responsive behaviour.",
        },
        {
          title: "Build",
          text: "We develop the site, test it across devices and refine the details.",
        },
        {
          title: "Launch",
          text: "We prepare the site for launch, including metadata and technical checks, and hand over what you need to manage it.",
        },
      ],
    },
    bestFor: [
      "Businesses launching their first professional website",
      "Founders and startups who need a credible online presence",
      "Service businesses that need to explain several offers clearly",
      "Brands that want a custom design rather than a template",
    ],
    faqs: [
      {
        q: "What’s the difference between a website and a landing page?",
        a: "A website is a multi-page site that covers your business as a whole. A landing page is a single focused page built around one offer or campaign. If you only need the latter, our landing page service is a better fit.",
      },
      {
        q: "Do you handle both design and development?",
        a: "Yes. Design and development are done together, so the finished website matches the design and the structure supports the content.",
      },
      {
        q: "Will the website work on mobile devices?",
        a: "Yes. Every page is designed and built to be responsive across phones, tablets and desktop screens.",
      },
      {
        q: "Can you help with page structure and content?",
        a: "We plan the structure and can advise on how to present your content. You know your business best, so we’ll ask for your input on the details.",
      },
      SCOPE_FAQ,
    ],
    related: [
      {
        slug: "ecommerce-development",
        reason:
          "If your main goal is to sell products online, an e-commerce build covers catalogues, product pages and checkout.",
      },
      {
        slug: "landing-pages",
        reason:
          "Need a single focused page for a campaign or launch rather than a full website?",
      },
      {
        slug: "website-maintenance-support",
        reason:
          "Once the site is live, ongoing care keeps it updated and supported.",
      },
    ],
    ctaCopy:
      "Tell us about your business and what you want the website to do. We’ll help you work out the pages and priorities.",
  },

  /* 2 ------------------------------------------------------------------ */
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    metaTitle: "E-commerce Website Development Services",
    metaDescription:
      "E-commerce development for brands ready to sell online: designed stores with clear product discovery, strong product pages and a smooth purchase flow.",
    eyebrow: "SERVICES · E-COMMERCE DEVELOPMENT",
    h1: {
      before: "E-commerce development for stores that make buying",
      accent: "feel effortless.",
    },
    intro:
      "An online store has to do more than display products. It has to help people find the right one, trust what they are buying and complete the purchase without friction. We design and develop e-commerce websites around that journey.",
    overview: [
      "This service suits brands that are ready to sell products online, whether you are launching a first store or moving to one that better reflects your brand.",
      "We focus on the parts of a store that shape buying decisions: how products are organised, how product pages present information and how the cart and checkout guide someone to purchase.",
    ],
    problems: {
      title: "Problems a better store solves",
      items: [
        {
          title: "Customers can’t find what they want",
          text: "Clear categories and navigation make browsing easier, and keep it manageable as your catalogue grows.",
        },
        {
          title: "Product pages leave questions unanswered",
          text: "Product pages are structured to present images, descriptions, options and key details in a consistent, scannable way.",
        },
        {
          title: "Shoppers give up at checkout",
          text: "A simple, clear cart and checkout flow removes unnecessary steps and uncertainty wherever it can.",
        },
        {
          title: "The store looks like every other store",
          text: "A brand-led design helps your products stand out instead of blending into a generic template.",
        },
        {
          title: "Phones are an afterthought",
          text: "Layouts are designed for touch and small screens, not simply squeezed down from desktop.",
        },
      ],
    },
    deliverables: {
      title: "What you receive",
      items: [
        {
          title: "Store design",
          text: "A custom design for your storefront, category pages, product pages, cart and checkout.",
        },
        {
          title: "Catalogue structure",
          text: "A category and product structure planned around how your customers actually browse.",
        },
        {
          title: "Product page templates",
          text: "Reusable layouts for images, descriptions, variations and key product information.",
        },
        {
          title: "Cart and checkout flow",
          text: "A clear path from basket to order, set up with the payment provider you choose.",
        },
        {
          title: "Responsive build",
          text: "A store that works across phones, tablets and desktop screens.",
        },
        {
          title: "Search-ready foundations",
          text: "Unique titles and descriptions, clean page addresses and structured data on product and category pages where your project calls for it.",
        },
      ],
    },
    extra: {
      title: "Questions we ask when planning your store",
      intro:
        "The answers shape how the store is structured, so we cover them early.",
      items: [
        {
          title: "How many products do you sell?",
          text: "Catalogue size affects how we organise categories and navigation.",
        },
        {
          title: "Do your products have variations?",
          text: "Sizes, colours and other options change how product pages and stock need to work.",
        },
        {
          title: "Who will manage the store day to day?",
          text: "How your team adds products and handles orders influences how the store is set up.",
        },
        {
          title: "How will customers pay?",
          text: "Your payment provider and any shipping requirements affect the checkout.",
        },
      ],
    },
    process: {
      title: "How we approach it",
      steps: [
        {
          title: "Understand your products and customers",
          text: "We learn what you sell, who buys it and how you want to manage the store.",
        },
        {
          title: "Plan the catalogue",
          text: "We organise categories, navigation and product information so the store is easy to browse.",
        },
        {
          title: "Design the journey",
          text: "We design the storefront, product pages, cart and checkout around how people shop.",
        },
        {
          title: "Build and connect",
          text: "We build the store, connect the services it needs, such as your payment provider, and test the purchase flow.",
        },
        {
          title: "Launch",
          text: "We check the store before it goes live and hand over what your team needs to manage products and orders.",
        },
      ],
    },
    bestFor: [
      "Brands launching an online store for the first time",
      "Businesses selling physical or digital products directly to customers",
      "Existing sellers who want a store that reflects their brand more clearly",
      "Founders adding online sales alongside another sales channel",
    ],
    faqs: [
      {
        q: "What do I need before starting an e-commerce project?",
        a: "It helps to know what you sell, how it is grouped and how you plan to take payments and fulfil orders. If some of that is undecided, we can work through it with you during planning.",
      },
      {
        q: "How is an e-commerce website different from a business website?",
        a: "A business website explains and promotes what you do. An e-commerce website also handles a product catalogue, a cart and checkout. If you don’t sell products online, website design and development may be the better fit.",
      },
      {
        q: "Can the store match our brand?",
        a: "Yes. The store is designed around your brand’s look and voice rather than a generic template layout.",
      },
      {
        q: "Do you provide product photography or product descriptions?",
        a: "Our e-commerce service focuses on the design and development of your store. When you get in touch, tell us what you already have, such as product images and descriptions, and we’ll discuss what is needed.",
      },
      SCOPE_FAQ,
    ],
    related: [
      {
        slug: "landing-pages",
        reason:
          "Launching a single product or campaign? A landing page can focus attention on it.",
      },
      {
        slug: "website-design-development",
        reason:
          "Need pages beyond the store, such as an about page or service pages?",
      },
      {
        slug: "website-maintenance-support",
        reason:
          "Keep your store updated and supported after it goes live.",
      },
    ],
    ctaCopy:
      "Tell us what you sell and how you want customers to buy it. We’ll help you work out the right starting point for your store.",
  },

  /* 3 ------------------------------------------------------------------ */
  {
    slug: "landing-pages",
    title: "Landing Pages",
    metaTitle: "Landing Page Design & Development",
    metaDescription:
      "Landing page design and development for launches, campaigns and single offers: focused pages that communicate your value clearly and encourage the next step.",
    eyebrow: "SERVICES · LANDING PAGES",
    h1: {
      before: "Landing page design and development that makes the next step",
      accent: "obvious.",
    },
    intro:
      "A landing page has one job: help the right visitor understand a single offer and decide what to do next. We design and build focused pages for launches, campaigns, products and services, without the distractions of a full website.",
    overview: [
      "Unlike a multi-page website, a landing page removes everything that isn’t needed for one decision. It leads with a clear message, supports it with relevant information and points to one primary action.",
      "Our approach is conversion-conscious, but we don’t promise specific results. What we do is make the message clear, keep the structure focused and build the page to be fast and usable on every device.",
    ],
    problems: {
      title: "Problems a focused landing page solves",
      items: [
        {
          title: "Campaign traffic lands on a general website",
          text: "Visitors who arrive from an advert, email or post expect a specific message. A dedicated page gives them one instead of a page about everything.",
        },
        {
          title: "The offer is buried",
          text: "We lead with the value of the offer and support it with only the information that helps someone decide.",
        },
        {
          title: "There are too many choices",
          text: "One primary action means fewer competing links and buttons pulling attention away from it.",
        },
        {
          title: "The page is awkward on a phone",
          text: "Lean, responsive builds keep the page easy to read and use on small screens.",
        },
        {
          title: "It’s hard to tell whether the page works",
          text: "A single goal is easier to measure with the analytics tools you already use.",
        },
      ],
    },
    deliverables: {
      title: "What you receive",
      items: [
        {
          title: "Message-led page design",
          text: "A layout built around your headline, your offer and the primary action.",
        },
        {
          title: "A focused page structure",
          text: "Sections ordered to answer the questions a visitor has before they act.",
        },
        {
          title: "Responsive development",
          text: "A fast-loading, mobile-friendly page built to the agreed design.",
        },
        {
          title: "A clear action path",
          text: "A call to action connected to whatever suits you, such as a form, a booking link or a WhatsApp message.",
        },
        {
          title: "Metadata and sharing setup",
          text: "A page title, description and social preview, so the page looks right in search results and when shared.",
        },
        {
          title: "Accessible forms and links",
          text: "Labelled fields, readable contrast and descriptive buttons.",
        },
      ],
    },
    extra: {
      title: "What a landing page usually answers",
      intro:
        "The exact sections depend on the offer, but a focused page answers a small set of questions in order.",
      items: [
        {
          title: "What is this?",
          text: "A headline and short supporting line that state the offer plainly.",
        },
        {
          title: "Why does it matter to me?",
          text: "The benefits that matter to the visitor, rather than a long list of features.",
        },
        {
          title: "Can I trust it?",
          text: "Genuine supporting information, such as real client feedback or examples of your work, if you have them. We never invent proof.",
        },
        {
          title: "What do I do next?",
          text: "One clear action, repeated where it makes sense.",
        },
      ],
    },
    process: {
      title: "How we approach it",
      steps: [
        {
          title: "Define the goal",
          text: "We agree who the page is for, what it should say and the one action you want visitors to take.",
        },
        {
          title: "Shape the message",
          text: "We structure the headline, sections and call to action so the page reads in a logical order.",
        },
        {
          title: "Design and build",
          text: "We design the page in your brand style and build it to be responsive and lightweight.",
        },
        {
          title: "Review and launch",
          text: "We check the page and its action path, then prepare it for launch.",
        },
      ],
    },
    bestFor: [
      "Product or service launches",
      "Marketing and advertising campaigns",
      "Event sign-ups, enquiries and bookings",
      "Founders testing a single offer before building a full website",
    ],
    faqs: [
      {
        q: "When should I choose a landing page instead of a full website?",
        a: "Choose a landing page when you have one offer, campaign or goal to communicate. If you need to explain several services or your business as a whole, a full website is a better fit.",
      },
      {
        q: "Can a landing page sit alongside my existing website?",
        a: "Yes. A landing page can work next to your current site or stand on its own, depending on how you plan to use it.",
      },
      {
        q: "Do landing pages help with SEO?",
        a: "A well-built page with a clear title, description and structure can be found in search, but landing pages are most often used with campaigns and direct links. We don’t guarantee rankings for any page.",
      },
      {
        q: "Can you include a way for visitors to contact me?",
        a: "Yes. We build the action path that fits how you handle enquiries, such as a form, a booking link or a WhatsApp message.",
      },
      SCOPE_FAQ,
    ],
    related: [
      {
        slug: "website-design-development",
        reason:
          "If your offer needs a complete multi-page presence, a full website gives it room.",
      },
      {
        slug: "interactive-web-experiences",
        reason:
          "Add refined motion and interaction to a launch or campaign page.",
      },
      {
        slug: "ecommerce-development",
        reason:
          "Selling products directly? An online store handles the catalogue and checkout.",
      },
    ],
    ctaCopy:
      "Tell us about the launch, campaign or offer. We’ll help you decide what the page needs to say and do.",
  },

  /* 4 ------------------------------------------------------------------ */
  {
    slug: "interactive-web-experiences",
    title: "Interactive Web Experiences",
    metaTitle: "Interactive Website Development",
    metaDescription:
      "Interactive website development with purposeful motion and distinctive digital experiences that make your brand memorable without sacrificing usability.",
    eyebrow: "SERVICES · INTERACTIVE WEB EXPERIENCES",
    h1: {
      before: "Interactive website development that makes your brand",
      accent: "memorable.",
    },
    intro:
      "Motion and interaction can make a website feel considered and distinctive, but only when they serve the content. We design and develop interactive web experiences where every effect has a reason and the site stays usable and accessible.",
    overview: [
      "This service is for brands that want a more distinctive, motion-led website: scroll-based reveals, refined transitions, interactive elements and visual details that set them apart.",
      "We treat interaction as part of the design rather than a layer added on top. Content stays readable, navigation stays predictable and motion respects visitors who prefer less movement.",
    ],
    problems: {
      title: "Problems purposeful interaction solves",
      items: [
        {
          title: "The website feels like every other website",
          text: "Considered motion and interaction give your brand a recognisable personality.",
        },
        {
          title: "Important content gets overlooked",
          text: "Subtle motion can guide attention through a page, helping visitors follow a story or find the next step.",
        },
        {
          title: "Animation makes the site feel heavy",
          text: "We keep effects lightweight and avoid anything that doesn’t earn its place on the page.",
        },
        {
          title: "Effects get in the way of accessibility",
          text: "We design with reduced-motion preferences, keyboard use and readable content in mind.",
        },
        {
          title: "A static page can’t tell the brand’s story",
          text: "Sequenced reveals and interactive sections let a story unfold as people scroll.",
        },
      ],
    },
    deliverables: {
      title: "What you receive",
      items: [
        {
          title: "Interaction design",
          text: "A plan for where motion and interaction add meaning, and where restraint serves the page better.",
        },
        {
          title: "Scroll and entrance animations",
          text: "Refined reveals and transitions designed to feel smooth rather than showy.",
        },
        {
          title: "Interactive components",
          text: "Custom elements such as hover states, carousels and interactive sections designed around your content.",
        },
        {
          title: "Reduced-motion support",
          text: "Alternatives for visitors who prefer less movement.",
        },
        {
          title: "Content that works without effects",
          text: "Core content stays readable if scripts or animations fail to load.",
        },
        {
          title: "A performance-minded build",
          text: "Effects built to stay lightweight and checked on real devices.",
        },
      ],
    },
    extra: {
      title: "Where interaction helps, and where it doesn’t",
      intro:
        "More motion is not always better. These principles decide where an effect belongs.",
      items: [
        {
          title: "Help people understand",
          text: "Motion that shows how something works, or where to look, earns its place.",
        },
        {
          title: "Support the story",
          text: "Sequenced reveals can pace a brand story so each idea lands before the next one arrives.",
        },
        {
          title: "Respect the content",
          text: "Text, products and calls to action stay easy to read and easy to find.",
        },
        {
          title: "Know when to stop",
          text: "A page with a few refined moments often feels better than one where everything moves.",
        },
      ],
    },
    process: {
      title: "How we approach it",
      steps: [
        {
          title: "Define the experience",
          text: "We agree what the site should feel like and which moments deserve interaction.",
        },
        {
          title: "Plan the interactions",
          text: "We decide how each effect behaves, including how it works on touch screens and with reduced motion.",
        },
        {
          title: "Build with restraint",
          text: "We implement the effects with lightweight techniques and keep the content readable at all times.",
        },
        {
          title: "Test and refine",
          text: "We review how the experience behaves across devices and adjust anything that distracts.",
        },
      ],
    },
    bestFor: [
      "Brands that want a distinctive, motion-led website",
      "Creative studios, portfolios and product launches where presentation matters",
      "Businesses telling a brand story through a scrolling experience",
      "Teams that already have a solid website and want it to feel more memorable",
    ],
    faqs: [
      {
        q: "Will interactive effects slow my website down?",
        a: "They can if they are added carelessly. We keep effects lightweight and avoid unnecessary dependencies, but the exact impact depends on what the project includes.",
      },
      {
        q: "Is an interactive website bad for SEO?",
        a: "Not by default. Content should be present in the page itself rather than hidden behind effects, so search engines and visitors can read it. We build with that in mind, though we can’t guarantee rankings.",
      },
      {
        q: "Can interactive websites be accessible?",
        a: "Yes, when they are designed for it. We support reduced-motion preferences and keyboard navigation, keep contrast readable and make sure essential content doesn’t depend on animation.",
      },
      {
        q: "Can you add interaction to a website I already have?",
        a: "Often, depending on how it was built. Tell us about your current website through the contact page and we’ll discuss what is feasible.",
      },
      {
        q: "Does my business need an interactive website?",
        a: "Not every business does. A clear, well-built website serves many goals. Interaction is worth considering when distinctiveness matters to your brand and the effects serve the content.",
      },
    ],
    related: [
      {
        slug: "website-design-development",
        reason:
          "Start with a complete, custom website and build interaction into it.",
      },
      {
        slug: "landing-pages",
        reason:
          "Bring refined motion to a focused launch or campaign page.",
      },
      {
        slug: "website-redesigns",
        reason:
          "Give an existing website a more distinctive feel as part of a redesign.",
      },
    ],
    ctaCopy:
      "Tell us about your brand and the kind of experience you want visitors to have. We’ll help you decide where interaction adds value.",
  },

  /* 5 ------------------------------------------------------------------ */
  {
    slug: "website-redesigns",
    title: "Website Redesigns",
    metaTitle: "Website Redesign Services",
    metaDescription:
      "Website redesign services for businesses with an existing site: a fresh design, better user experience and updated functionality, planned to protect what works.",
    eyebrow: "SERVICES · WEBSITE REDESIGNS",
    h1: {
      before: "Website redesign that modernises your site while",
      accent: "keeping what works.",
    },
    intro:
      "A website redesign gives an existing site a new design, a clearer structure and updated functionality. It suits businesses whose website no longer reflects who they are, how their customers behave or what the business now needs it to do.",
    overview: [
      "A redesign is more than a visual refresh. We review what your current website does well, where visitors struggle and what has changed in your business, then rebuild around those findings.",
      "We also pay attention to what you already have: existing page addresses, content that brings people in and links from other sites. Handled carefully, a redesign doesn’t have to throw those away.",
    ],
    problems: {
      title: "Signs your website may be due for a redesign",
      items: [
        {
          title: "It looks dated or off-brand",
          text: "The design no longer matches how your business presents itself elsewhere.",
        },
        {
          title: "It’s hard to use on mobile",
          text: "Layouts that weren’t built for small screens make visitors work harder than they should.",
        },
        {
          title: "Visitors don’t take the next step",
          text: "Unclear structure or messaging can leave people unsure where to go.",
        },
        {
          title: "The business has changed",
          text: "New services, products or audiences may not fit a structure built for the old ones.",
        },
        {
          title: "The site is hard to update",
          text: "Outdated code and tools can make even small changes difficult.",
        },
      ],
    },
    deliverables: {
      title: "What you receive",
      items: [
        {
          title: "A review of the current website",
          text: "An assessment of structure, content, usability and technical basics before any design work starts.",
        },
        {
          title: "An updated design",
          text: "A fresh visual direction applied consistently across the site.",
        },
        {
          title: "Improved structure and navigation",
          text: "A clearer page hierarchy and navigation based on what visitors need.",
        },
        {
          title: "Rebuilt, responsive pages",
          text: "Modern, maintainable code that works across devices.",
        },
        {
          title: "Page address and redirect planning",
          text: "A plan for existing URLs, with redirects where pages move, so existing links and search visibility aren’t lost unnecessarily.",
        },
        {
          title: "A metadata and technical check",
          text: "Titles, descriptions, headings and canonical tags reviewed as part of the rebuild.",
        },
      ],
    },
    extra: {
      title: "When to redesign and when to refine",
      intro:
        "Not every problem needs a full redesign. This is how we think about the difference.",
      items: [
        {
          title: "Refine when the foundations are sound",
          text: "If the structure works and the problems are limited to a few pages or sections, targeted improvements may be enough.",
        },
        {
          title: "Redesign when the whole site is holding you back",
          text: "If the overall design, structure or technology no longer supports the business, a redesign makes sense.",
        },
        {
          title: "Start fresh when the business has changed",
          text: "If your offer has changed so much that the old structure no longer fits, a new website may be the cleaner option.",
        },
      ],
    },
    process: {
      title: "How we approach it",
      steps: [
        {
          title: "Review",
          text: "We look at what works, what doesn’t and what has changed in your business.",
        },
        {
          title: "Plan",
          text: "We agree the new structure, decide what content to keep and identify which page addresses will change.",
        },
        {
          title: "Redesign",
          text: "We create the new design around your brand and your visitors’ needs.",
        },
        {
          title: "Rebuild and migrate",
          text: "We build the new pages and move across the content you are keeping.",
        },
        {
          title: "Launch and check",
          text: "We check redirects, metadata and links before and after the new site goes live.",
        },
      ],
    },
    bestFor: [
      "Businesses with a website that looks dated or no longer fits the brand",
      "Companies that have outgrown their original website",
      "Sites that are hard to use on mobile",
      "Teams that want better structure without starting from nothing",
    ],
    faqs: [
      {
        q: "Will a redesign affect my search visibility?",
        a: "Any significant change to a site can affect how it appears in search, which is why we plan page addresses, redirects and metadata carefully. We can’t promise how rankings will change, but we aim to avoid unnecessary losses.",
      },
      {
        q: "Can we keep our existing content?",
        a: "Often, yes. We review your content together and decide what to keep, what to improve and what to retire.",
      },
      {
        q: "Do I have to keep my current page addresses?",
        a: "Not always. Where addresses change, we plan redirects so visitors and existing links still reach the right page.",
      },
      {
        q: "What’s the difference between a redesign and a new website?",
        a: "A redesign starts from your existing site, keeping what works and improving the rest. A new website starts from a blank page, which is what our website design and development service covers.",
      },
      SCOPE_FAQ,
    ],
    related: [
      {
        slug: "website-design-development",
        reason:
          "Starting from scratch rather than updating an existing site? A new build may suit you better.",
      },
      {
        slug: "interactive-web-experiences",
        reason:
          "Add distinctive motion and interaction to the refreshed design.",
      },
      {
        slug: "website-maintenance-support",
        reason:
          "Keep the redesigned site updated and supported once it is live.",
      },
    ],
    ctaCopy:
      "Tell us about your current website and what isn’t working. We’ll help you decide whether a redesign is the right next step.",
  },

  /* 6 ------------------------------------------------------------------ */
  {
    slug: "website-maintenance-support",
    title: "Website Maintenance & Support",
    metaTitle: "Website Maintenance & Support Services",
    metaDescription:
      "Website maintenance and support for businesses: regular updates, security checks and technical help to keep your website running smoothly after launch.",
    eyebrow: "SERVICES · WEBSITE MAINTENANCE & SUPPORT",
    h1: {
      before: "Website maintenance and support that keeps your site",
      accent: "running smoothly.",
    },
    intro:
      "A website isn’t finished when it launches. Software ages, content needs updating and small problems grow if nobody is looking after them. Our maintenance and support service takes care of your website so you can focus on running your business.",
    overview: [
      "This service is for businesses that want ongoing care for their website: regular updates, security checks and someone to turn to when something needs fixing or changing.",
      "What is included depends on your website and what you need. We agree the scope with you rather than offering one fixed package, so the support fits your site.",
    ],
    problems: {
      title: "Problems ongoing support solves",
      items: [
        {
          title: "Nobody is responsible for the website",
          text: "A clear point of contact means issues don’t sit unnoticed.",
        },
        {
          title: "Software and dependencies fall behind",
          text: "Regular updates help you avoid problems caused by outdated components.",
        },
        {
          title: "Security is an afterthought",
          text: "Routine security checks help spot and address common risks.",
        },
        {
          title: "Small changes are hard to get done",
          text: "Content tweaks, fixes and minor improvements have somewhere to go instead of waiting for a full project.",
        },
        {
          title: "Things break and nobody knows why",
          text: "When something stops working, you have support to diagnose and fix it.",
        },
      ],
    },
    deliverables: {
      title: "What ongoing support can cover",
      items: [
        {
          title: "Regular updates",
          text: "Updates to your website’s code and dependencies, checked before they go live.",
        },
        {
          title: "Security checks",
          text: "Routine checks for common security issues.",
        },
        {
          title: "Technical support",
          text: "Help when something isn’t working as expected.",
        },
        {
          title: "Content and small changes",
          text: "Updates to text and images, and minor page changes.",
        },
        {
          title: "Issue fixing",
          text: "Diagnosing and fixing bugs and layout problems.",
        },
        {
          title: "Guidance",
          text: "Advice on what to improve next as your needs change.",
        },
      ],
    },
    extra: {
      title: "Maintenance, support and new work",
      intro:
        "It helps to know where ongoing care ends and a new project begins.",
      items: [
        {
          title: "Maintenance keeps the site healthy",
          text: "Updates and checks that keep the website current and working.",
        },
        {
          title: "Support helps when you need it",
          text: "Answers and fixes when you have a question or something goes wrong.",
        },
        {
          title: "Improvements are scoped separately",
          text: "Larger changes, such as new pages or features, are usually planned as their own piece of work.",
        },
      ],
    },
    process: {
      title: "How support works",
      steps: [
        {
          title: "Review your website",
          text: "We look at how the site is built and what it depends on.",
        },
        {
          title: "Agree what’s covered",
          text: "We agree the scope of support with you, based on your site and your needs.",
        },
        {
          title: "Maintain and update",
          text: "We carry out the agreed updates and checks.",
        },
        {
          title: "Support as needed",
          text: "You get in touch when something needs fixing or changing, and we respond as agreed.",
        },
      ],
    },
    bestFor: [
      "Businesses without in-house technical staff",
      "Owners who would rather not worry about updates and security",
      "Websites that need regular changes after launch",
      "Teams that want a single point of contact for website issues",
    ],
    faqs: [
      {
        q: "What does website maintenance include?",
        a: "It depends on your website, but it typically covers updates, security checks, technical support and small content changes. We agree the scope with you.",
      },
      {
        q: "Can you maintain a website you didn’t build?",
        a: "It depends on how the site was built. Contact us with details of your website and we’ll tell you whether we can support it.",
      },
      {
        q: "Why does a website need maintenance?",
        a: "Websites rely on software, frameworks and hosting that change over time. Without regular care, parts of a site can become outdated, insecure or broken.",
      },
      {
        q: "Are bigger changes included?",
        a: "Small changes and fixes can be part of ongoing support. Larger work, such as new pages or features, is usually scoped as a separate project.",
      },
      {
        q: "How much does support cost?",
        a: "We don’t publish fixed prices because the right level of support depends on your website. Contact us with the details and we’ll discuss what you need.",
      },
    ],
    related: [
      {
        slug: "website-redesigns",
        reason:
          "If the site has outgrown its design, a redesign may be the better next step.",
      },
      {
        slug: "ecommerce-development",
        reason:
          "Running an online store? It needs updates and support after launch too.",
      },
      {
        slug: "website-design-development",
        reason:
          "Need a new website rather than care for an existing one?",
      },
    ],
    ctaCopy:
      "Tell us about your website and what support you need. We’ll help you work out what ongoing care should cover.",
  },
];

export function getServiceBySlug(slug) {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}