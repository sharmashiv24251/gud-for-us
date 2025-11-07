import type { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <>
      <footer className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <FooterContent />
        </div>
      </footer>
      <FooterBottom />
    </>
  );
}

function FooterContent() {
  return (
    <div>
      <Logo />
      <FooterLinks />
      <Copyright />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-8 w-8 rounded-md bg-neutral-900 ring-1 ring-white/10 grid place-content-center text-emerald-300 text-xs font-semibold"
        style={{ letterSpacing: "-0.02em" }}
      >
        G
      </div>
      <span className="text-sm text-neutral-300">GoodForUs</span>
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
    <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-400">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-1 py-0.5 w-fit"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function Copyright() {
  const year = new Date().getFullYear();
  return (
    <p className="mt-4 text-xs text-neutral-500">
      © {year} GoodForUs. All rights reserved.
    </p>
  );
}

function FooterBottom() {
  return (
    <div className="w-full bg-neutral-950 border-t max-w-7xl mx-auto border-white/10 overflow-hidden">
      <h2
        className="text-white font-semibold whitespace-nowrap text-center"
        style={{
          fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
          fontSize: "clamp(1rem, 25vw, 20rem)",
          letterSpacing: "-0.07em",
          lineHeight: "1",
          margin: "0 0 50px 0",
          padding: "0.15em 0",
        }}
      >
        gud for us
      </h2>
    </div>
  );
}
