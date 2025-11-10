import type { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full border-t border-white/10 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <FooterContent />
      </div>

      <FooterBottom />
    </footer>
  );
}

function FooterContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
      <div>
        <Logo />
      </div>

      <div className="sm:col-span-1">
        <FooterLinks />
      </div>

      <div className="flex items-end justify-start sm:justify-end">
        <Copyright />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden
        className="h-8 w-8 rounded-md bg-background ring-1 ring-white/10 grid place-content-center text-emerald-300 text-xs font-semibold"
        style={{ letterSpacing: "-0.02em" }}
      >
        G
      </div>
      <span className="text-sm text-foreground">GoodForUs</span>
    </div>
  );
}

function FooterLinks() {
  const links = [
    { href: "#cards", label: "Pillars" },
    { href: "#story", label: "Our Story" },
    { href: "#testimonials", label: "Voices" },
    { href: "#community", label: "Community" },
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
  ];

  return (
    <nav aria-label="Footer" className="mt-2">
      <ul className="grid grid-cols-2 gap-2 text-sm text-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-block hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-1 py-0.5"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Copyright() {
  const year = new Date().getFullYear();
  return (
    <p className="text-xs text-foreground">
      © {year} GoodForUs. All rights reserved.
    </p>
  );
}

function FooterBottom() {
  return (
    // keep this full-bleed and visually connected to the footer above
    <div className="w-full bg-background border-t border-white/10">
      {/* center the big title in the same max width as the content but allow the background to bleed */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <h2
          className="text-foreground font-semibold whitespace-nowrap text-center m-0"
          style={{
            fontFamily: "var(--font-league-spartan)", // Use the CSS variable
            fontSize: "clamp(1rem, 21.5vw, 15rem)",
            letterSpacing: "-0.07em",
            lineHeight: "1",
            margin: 0,
            padding: "0.15em 0",
          }}
        >
          gud for us
        </h2>
      </div>
    </div>
  );
}
