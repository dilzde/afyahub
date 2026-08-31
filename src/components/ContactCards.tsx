"use client";
import Link from "next/link";

interface ContactCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  sub: string;
}

export default function ContactCards({ cards }: { cards: ContactCard[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "clamp(3rem,6vw,5rem)",
      }}
    >
      {cards.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="contact-card-link"
        >
          <div className="contact-card admin-card">
            <div className="contact-card-icon">{item.icon}</div>
            <p className="contact-card-label">{item.label}</p>
            <p className="contact-card-value">{item.value}</p>
            <p className="contact-card-sub">{item.sub}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
