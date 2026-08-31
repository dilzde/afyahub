"use client";
import { useState } from "react";

const faqs = [
  { q: "Do I need a referral from another doctor?", a: "No. You can book directly. If you have referral letters, imaging or lab results, bring them along — they're helpful but not required." },
  { q: "How quickly can I get an appointment?", a: "For consultations, usually within 1–3 working days. For procedures, it depends on theatre availability — we'll give you options when we confirm." },
  { q: "What should I bring to my appointment?", a: "Any previous imaging (CDs or reports), lab results, current medication list, and your ID or passport. If you have a referral letter, bring that too." },
  { q: "Do you accept insurance?", a: "Yes, we work with several insurers. Please mention your provider when booking so we can confirm coverage beforehand. Self-pay patients are also welcome." },
  { q: "What if I need to cancel or reschedule?", a: "Contact us as soon as possible by phone or email. We ask for at least 24 hours' notice so we can offer the slot to another patient." },
  { q: "Will I know which doctor I'll see?", a: "Yes. When we confirm your appointment, we'll let you know which consultant has been assigned based on your needs and their availability." },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="overline">Common questions</p>
          <h2 className="h2">Frequently asked</h2>
          <p>Practical answers to the things people ask us most.</p>
        </div>
        <div className="faq-list" data-reveal="">
          {faqs.map((item, i) => (
            <div key={i} className={`faq-item${openIdx === i ? " open" : ""}`}>
              <button className="faq-q" aria-expanded={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <h3>{item.q}</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
