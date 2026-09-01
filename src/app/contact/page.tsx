import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import RevealInit from "@/components/RevealInit";
import ContactCards from "@/components/ContactCards";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AfyaHub. Call us, email us, or visit us off Waiyaki Way, Westlands, Nairobi. We reply within one working day.",
  openGraph: { title: "Contact Us | AfyaHub" },
};

export default function ContactPage() {
  const settings = getSettings();
  const { contact, hours } = settings;

  const cards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5c0-1 3-2 4 0l1.5 3-2 2c1 2.5 3.5 5 6 6l2-2 3 1.5c2 1 1 4 0 4C17 20 5 17 4 8 3.8 6.8 4 5.6 4 5z" />
        </svg>
      ),
      label: "Call us",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      sub: "Mon–Fri 8:00–17:00 · Sat 9:00–13:00",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      ),
      label: "Email us",
      value: contact.email,
      href: `mailto:${contact.email}`,
      sub: "We reply within one working day",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      label: "Visit us",
      value: contact.address,
      href: "https://maps.google.com/?q=Westlands+Nairobi",
      sub: contact.addressDetail,
    },
  ];

  return (
    <>
      <RevealInit />

      {/* Page hero */}
      <div className="page-hero">
        <div className="wrap">
          <p className="overline" style={{ color: "rgba(255,255,255,0.5)" }}>Get in touch</p>
          <h1>Contact us</h1>
          <p>
            We&apos;re always happy to help — whether you have a question, need
            directions, or want to book an appointment.
          </p>
        </div>
      </div>

      {/* Contact cards + hours */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) 0", background: "var(--white)" }}>
        <div className="wrap">
          <ContactCards cards={cards} />

          {/* Opening hours */}
          <div className="admin-card" style={{ maxWidth: 500 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".6rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
              </svg>
              Opening Hours
            </h2>
            {hours.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: ".65rem 0",
                  borderBottom: i < hours.length - 1 ? "1px solid var(--line)" : "none",
                  fontSize: ".92rem",
                }}
              >
                <span style={{ fontWeight: 500 }}>{h.days}</span>
                <span
                  style={{
                    color: h.hours.toLowerCase() === "closed" ? "var(--ink-faint)" : "var(--ink-soft)",
                    fontWeight: h.hours.toLowerCase() === "closed" ? 400 : 500,
                  }}
                >
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <BookingForm settings={settings} />
    </>
  );
}
