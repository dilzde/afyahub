import type { Metadata } from "next";
import Journey from "@/components/Journey";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = {
  title: "Your Visit",
  description:
    "Learn what to expect when you visit AfyaHub — from booking your appointment to your procedure and follow-up. A simple 4-step process with no mysteries.",
  openGraph: { title: "Your Visit | AfyaHub" },
};

export default function VisitPage() {
  return (
    <>
      <RevealInit />
      <div className="page-hero">
        <div className="wrap">
          <p className="overline" style={{ color: "rgba(255,255,255,0.5)" }}>How it works</p>
          <h1>Your visit, explained</h1>
          <p>
            From your first request to your final follow-up — here&apos;s exactly what
            happens at every step, with no surprises.
          </p>
        </div>
      </div>
      <Journey />

      {/* Extra info section */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) 0", background: "var(--paper)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {[
              {
                icon: "🗓️",
                title: "Arriving on time",
                body: "Please arrive 10 minutes before your appointment to complete any registration paperwork. Bring a valid ID and any previous imaging or lab results.",
              },
              {
                icon: "🏥",
                title: "What to expect",
                body: "You'll be seen by the consultant who confirmed your appointment. All consultations are private, unhurried, and in plain language — no jargon.",
              },
              {
                icon: "💊",
                title: "Preparation instructions",
                body: "For procedures like colonoscopy, we'll send you detailed written prep instructions before your visit. Follow them carefully for the best outcome.",
              },
              {
                icon: "📞",
                title: "After your visit",
                body: "Every patient receives a scheduled follow-up. If you have questions in between, call us directly — we always pick up during opening hours.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  padding: "1.6rem",
                  transition: "box-shadow .3s, transform .3s",
                }}
                className="cofounder-card"
              >
                <div style={{ fontSize: "2rem", marginBottom: ".75rem" }}>{item.icon}</div>
                <h3 style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: ".5rem" }}>{item.title}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: ".9rem", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
