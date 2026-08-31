"use client";
import Link from "next/link";

interface Settings {
  contact: { phone: string; email: string };
  hours: { days: string; hours: string }[];
}

export default function Topbar({ settings }: { settings: Settings }) {
  return (
    <div className="topbar">
      <div className="wrap">
        <span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
          </svg>
          {settings.hours[0].days} {settings.hours[0].hours} · {settings.hours[1].days} {settings.hours[1].hours}
        </span>
        <div className="tb-right">
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5c0-1 3-2 4 0l1.5 3-2 2c1 2.5 3.5 5 6 6l2-2 3 1.5c2 1 1 4 0 4C17 20 5 17 4 8 3.8 6.8 4 5.6 4 5z" />
            </svg>
            <a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`} className="tb-hide">
              {settings.contact.phone}
            </a>
          </span>
          <a href={`mailto:${settings.contact.email}`} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
            </svg>
            {settings.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
