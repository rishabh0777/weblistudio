import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";

import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = "https://webli.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "Webli Studio",

  title: {
    default: "Webli Studio | Web Design & Development Agency from India",
    template: "%s | Webli Studio",
  },

  description:
    "Webli Studio is an independent web design and development agency from India, creating custom websites, e-commerce experiences and interactive digital solutions for businesses worldwide.",

  keywords: [
    "Webli Studio",
    "web design agency India",
    "web development agency India",
    "website development company India",
    "custom website development",
    "website design services",
    "Next.js development agency",
    "React development services",
    "e-commerce website development",
    "interactive website design",
    "restaurant website design",
    "startup website development",
  ],

  authors: [{ name: "Webli Studio" }],
  creator: "Webli Studio",
  publisher: "Webli Studio",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Webli Studio",
    url: "/",
    title: "Webli Studio | Web Design & Development Agency from India",
    description:
      "Custom websites, e-commerce experiences and interactive digital solutions for ambitious businesses in India and worldwide.",
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
    title: "Webli Studio | Web Design & Development Agency from India",
    description:
      "Custom websites and digital experiences for ambitious businesses worldwide.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "JtjC0Spp1E4E7qkWm6b3CI6fpyxqbM4CT1FXrAwLR28",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}