import type { Metadata } from "next";
import { Inter, League_Spartan } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "Gud For Us",
  description: "Non-negotiables of health and wellbeing",
};

function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/50 backdrop-blur-md border-b border-white/50  before:absolute before:inset-0 before:bg-linear-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none">
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${leagueSpartan.variable} antialiased`}>
        <Header />
        <div className="mt-[84px]">{children}</div>
      </body>
    </html>
  );
}
