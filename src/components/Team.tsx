export default function Team({ teamImage }: { teamImage: string }) {
  return (
    <section className="team" id="team">
      <div className="wrap">
        <div className="team-grid">
          <div className="team-visual" data-reveal="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={teamImage} alt="Medical team in surgical attire" loading="lazy" />
          </div>
          <div data-reveal="">
            <div className="section-head">
              <p className="overline">Who you&apos;ll meet</p>
              <h2 className="h2">A team of specialists</h2>
              <p>
                We work with a growing network of consultant surgeons, physicians and
                endoscopists — each one carefully selected for their expertise and bedside manner.
              </p>
            </div>
            <div className="team-specialties">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>, label: "General Surgery" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>, label: "Laparoscopic Surgery" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>, label: "Internal Medicine" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /></svg>, label: "Endoscopy" },
              ].map((spec, i) => (
                <div className="team-spec" key={i}>
                  {spec.icon}
                  <span>{spec.label}</span>
                </div>
              ))}
            </div>
            <p className="team-note">
              When you book, we match you with the right consultant for your needs. You&apos;re always in expert hands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
