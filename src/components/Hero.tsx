import Link from "next/link";

interface Stat { value: string; label: string; }
interface Settings {
  contact: { phone: string };
  stats: Stat[];
  hours: { days: string; hours: string }[];
}

export default function Hero({ settings, heroImage }: { settings: Settings; heroImage: string }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="Modern medical facility" loading="eager" />
      </div>
      <div className="wrap">
        <div className="hero-content" data-reveal="">
          <div className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
            Surgical &amp; Endoscopic Care · Nairobi
          </div>
          <h1 className="h1">
            Expert care.<br /><span>Close to home.</span>
          </h1>
          <p className="hero-sub">
            Consultant-led procedures — from keyhole surgery to endoscopy — delivered
            with the precision you deserve and the warmth you expect.
          </p>
          <div className="hero-actions">
            <Link href="/services" className="btn-outline">
              See our services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>
          <div className="hero-facts">
            {settings.stats.map((s, i) => (
              <div className="fact" key={i}>
                <b>{s.value}</b>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
