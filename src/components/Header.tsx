"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BrandMark = () => (
  <svg className="brand-mark" width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#C4563A" />
    <path d="M8 32h14l4-12 6 24 5-12h19" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // back-to-top
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("toTop");
      if (el) el.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = document.getElementById("toTop");
    if (el) el.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/services",    label: "Services"   },
    { href: "/team",        label: "Our Team"   },
    { href: "/cofounders",  label: "Our Story"  },
    { href: "/visit",       label: "Your Visit" },
    { href: "/faq",         label: "FAQ"        },
    { href: "/contact",     label: "Contact"    },
  ];

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}${navOpen ? " nav-open" : ""}`} id="siteHeader">
      <div className="wrap">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="AfyaHub — home">
            <BrandMark />
            <span className="brand-name">Afya<em>Hub</em></span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation" style={{ gap: "1.4rem" }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/appointment" className="btn header-cta">
            Book Appointment
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <button
            className="nav-toggle"
            aria-expanded={navOpen}
            aria-label="Toggle menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
        {navOpen && (
          <div className="nav-panel">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setNavOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/appointment" className="btn" onClick={() => setNavOpen(false)}>
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
