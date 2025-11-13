import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, League_Spartan } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-league-spartan",
  display: "swap",
});

// ---- canonical root URL for your site ----
const SITE_URL = "https://gud-for-us.vercel.app"; // <- update
const PAGE_PATH = "/"; // update per-page if you render dynamic metadata
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// OpenGraph image (place in /public or use Next file-convention opengraph-image)
const OG_IMAGE = `${SITE_URL}/favicon.png`; // <- update
const OG_IMAGE_ALT =
  "Cover of 'Gud For Us' — Non-negotiables of health and wellbeing";

export const metadata: Metadata = {
  title: "Gud For Us — Non-negotiables of health and wellbeing",
  description:
    "Gud For Us — a concise eBook about health, nature and sustainability. Practical steps to reduce microplastics and live more sustainably.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Gud For Us — Non-negotiables of health and wellbeing",
    description:
      "A short, practical eBook about health, nature, sustainability, and microplastics — small choices that matter.",
    url: PAGE_URL,
    siteName: "Gud For Us",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gud For Us — Non-negotiables of health and wellbeing",
    description:
      "A short, practical eBook about health, nature, sustainability, and microplastics — small choices that matter.",
    images: [OG_IMAGE],
    creator: "@your_twitter_handle", // optional
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // optional: favicon/icons etc.
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Book structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Gud For Us",
    author: {
      "@type": "Person",
      name: "Author Name",
    },
    url: PAGE_URL,
    image: OG_IMAGE,
    description:
      "Non-negotiables of health and wellbeing — practical guide to reduce microplastics and live sustainably.",
    publisher: {
      "@type": "Organization",
      name: "Gud For Us / Publisher Name",
      url: SITE_URL,
    },
    // Optional: ISBN, datePublished, inLanguage
    isbn: "978-1-23456-789-0",
    datePublished: "2025-01-01",
    inLanguage: "en",
  };

  function Header() {
    return (
      <header className="fixed top-0 z-50 w-full bg-white/50 backdrop-blur-md border-b border-white/50  before:absolute before:inset-0 before:bg-linear-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:bg-linear-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-md overflow-hidden"
              style={{ letterSpacing: "-0.02em" }}
            >
              <Image src={"/favicon.png"} height={50} width={50} alt="Logo" />
            </div>
            <span className="text-sm text-foreground">gud for us</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-foreground">
            <a
              href="#cards"
              className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
            >
              Pillars
            </a>
            <a
              href="#story"
              className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
            >
              Our Story
            </a>
            <a
              href="#testimonials"
              className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
            >
              Voices
            </a>
            <a
              href="#community"
              className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
            >
              Community
            </a>
          </nav>
          {/* <div className="flex items-center gap-3">
          <a
            href="#checkout"
            className="hidden md:inline-flex items-center gap-2 rounded-md bg-background/70 hover:bg-background active:scale-[0.99] transition px-3 py-2 text-sm ring-1 ring-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <BookOpenIcon />
            <span>Preview</span>
          </a>
        </div> */}
        </div>
      </header>
    );
  }

  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable} antialiased`}>
        {/* Next.js will automatically render the head tags from metadata above */}
        {/* JSON-LD structured data for Google and other consumers */}
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>

        <Header />
        <main className="mt-[84px]">{children}</main>
      </body>
    </html>
  );
}
