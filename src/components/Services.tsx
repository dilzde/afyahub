"use client";
import { useState } from "react";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  brief: string;
  tag: string;
  icon: string;
  description: string;
  procedures: string[];
}

const icons: Record<string, JSX.Element> = {
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /><path d="M17 12h.01" /><path d="M7 12h.01" />
    </svg>
  ),
};

export default function Services({ services }: { services: Service[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="overline">What we do</p>
          <h2 className="h2">Four services, one standard of care</h2>
          <p>Every service is consultant-led, from first consultation to final follow-up. Expand any row to see what it covers.</p>
        </div>
        <div className="svc-list" data-reveal="">
          {services.map((svc) => {
            const isOpen = openId === svc.id;
            return (
              <article key={svc.id} id={svc.id} className={`svc${isOpen ? " open" : ""}`}>
                <button
                  className="svc-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : svc.id)}
                >
                  <span className="svc-icon">{icons[svc.icon]}</span>
                  <span className="svc-title-wrap">
                    <span className="svc-name">{svc.name}</span>
                    <span className="svc-brief">{svc.brief}</span>
                  </span>
                  <span className="svc-tag">{svc.tag}</span>
                  <span className="svc-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="svc-body">
                  <div className="svc-body-inner">
                    <div className="svc-cols">
                      <p className="svc-desc">{svc.description}</p>
                      <ul className="svc-proc">
                        {svc.procedures.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    <Link href="/appointment" className="link-arrow svc-book">
                      Book for {svc.name.toLowerCase()}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
