import type { Metadata } from "next";
import Faq from "@/components/Faq";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about appointments, referrals, insurance, and what to expect at AfyaHub surgical and endoscopy centre in Nairobi.",
  openGraph: { title: "FAQ | AfyaHub" },
};

export default function FaqPage() {
  return (
    <>
      <RevealInit />
      <div className="page-hero">
        <div className="wrap">
          <p className="overline" style={{ color: "rgba(255,255,255,0.5)" }}>Help</p>
          <h1>Frequently asked questions</h1>
          <p>Everything you need to know before your first visit.</p>
        </div>
      </div>
      <Faq />
    </>
  );
}
