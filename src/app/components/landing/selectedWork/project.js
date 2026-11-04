/* ==========================================================================
   Webli Studio — Portfolio data (single source of truth)

   Used by the homepage Selected Work carousel and by the /work page.

   Every field except `slug` and `title` is optional, and the UI renders only
   what is present. Only information found in the existing project files is
   filled in. Fields that could not be verified are deliberately absent:

     - Lion’s Den Cafe, Serene Stays Goa, Jerdon Villa: no URL, image,
       category or description exists in the project files yet.

   To complete one of those, add the missing fields here — nothing else in the
   UI needs to change:

     image:       "/works/<file>.png"   (file must exist in /public/works)
     alt:         "Screenshot of the <name> website"
     href:        "https://..."         (the live site)
     category:    "Hospitality · Business Website"
     description: "One factual sentence about what the site is."
     service:     "website-design-development" (any slug from serviceDetails.js)
   ========================================================================== */

export const PROJECTS = [
  {
    slug: "xvital-now",
    title: "Xvital Now",
    category: "Healthcare · Nutrition · Lifestyle",
    description:
      "Personalized nutrition and lifestyle recommendations for a healthier life.",
    image: "/works/xvital.png",
    alt: "Screenshot of the Xvital Now website",
    href: "https://www.xvital.in/",
    service: "website-design-development",
  },
  {
    slug: "launch-haus",
    title: "Launch Haus",
    category: "Business Development · Marketing Agency",
    description:
      "A clean, modern website for a business development and marketing agency.",
    image: "/works/launchHaus.png",
    alt: "Screenshot of the Launch Haus website",
    href: "https://www.launchhaus.in/",
    service: "website-design-development",
  },
  {
    slug: "aathavan-films",
    title: "Aathavan Films",
    category: "Photography · Cinematography",
    description: "A website for a photography and cinematography business.",
    image: "/works/aathavanFilms.png",
    alt: "Screenshot of the Aathavan Films website",
    href: "https://aathavanfilms.vercel.app/",
    service: "website-design-development",
  },
  {
    slug: "lions-den-cafe",
    title: "Lion’s Den Cafe (Archived)",
    category: "Cafe · Restaurant",
    description: "A website for a cafe and restaurant business.",
    image: "/works/lionsDenCafe.png",
    alt: "Screenshot of the Lion's Den Cafe website",
    // href: "https://lionsdencafe.vercel.app/",
    service: "website-design-development",
  },
  {
    slug: "serene-stays-goa",
    title: "Serene Stays Goa",
    category: "Hospitality · Vacation Rentals",
    description: "A website for a vacation rental business in Goa.",
    image: "/works/sereneStays.png",
    alt: "Screenshot of the Serene Stays Goa website",
    href: "https://serene-stays.vercel.app/",
    service: "website-design-development",
  },
  {
    slug: "jerdon-villa (Archived)",
    title: "Jerdon Villa",
    category: "Hospitality · Vacation Rentals",
    description: "A website for a vacation rental business in Bangalore.",
    image: "/works/jerdon.png",
    alt: "Screenshot of the Jerdon Villa website",
    // href: "https://jerdon-villa.vercel.app/",
    service: "website-design-development",
  },
];

// Kept apart from the six agency projects on purpose.
export const FOUNDER_PROJECT = {
  slug: "rishabh-srivastava-portfolio",
  title: "Rishabh Srivastava",
  category: "Portfolio · Personal Branding",
  description: "The personal portfolio website of Webli Studio’s founder.",
  image: "/works/rishabhsrivastava.png",
  alt: "Screenshot of the Rishabh Srivastava portfolio website",
  href: "https://rishabhsrivastava.vercel.app/",
};