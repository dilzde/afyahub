import type { Metadata } from "next";
import Team from "@/components/Team";
import RevealInit from "@/components/RevealInit";
import DoctorAvatar from "@/components/DoctorAvatar";
import { getDoctors, getImages } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the consultant surgeons, physicians and endoscopists at AfyaHub, Nairobi — carefully selected for expertise and bedside manner.",
  openGraph: { title: "Our Team | AfyaHub" },
};

export default function TeamPage() {
  const doctors = getDoctors();
  const images = getImages();

  return (
    <>
      <RevealInit />
      <div className="page-hero">
        <div className="wrap">
          <p className="overline" style={{ color: "rgba(255,255,255,0.5)" }}>Who you&apos;ll meet</p>
          <h1>Our specialists</h1>
          <p>Every consultant is chosen for clinical excellence and their ability to put patients at ease.</p>
        </div>
      </div>
      <Team teamImage={images.team} />
      {/* All doctors cards */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) 0", background: "var(--paper)" }}>
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <p className="overline">Our doctors</p>
            <h2 className="h2">Meet the team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "2rem" }} data-reveal="">
            {doctors.map((doc) => (
              <div key={doc.id} className="cofounder-card">
                <div className="cofounder-photo" style={{ position: "relative" }}>
                  <DoctorAvatar
                    name={doc.name}
                    image={doc.image}
                    aspectRatio="4/3"
                  />
                </div>
                <div className="cofounder-body">
                  {doc.isCofounder && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        display: "block",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Co-Founder
                    </span>
                  )}
                  <p className="cofounder-role">{doc.title}</p>
                  <h3 className="cofounder-name">{doc.name}</h3>
                  <p className="cofounder-specialty">{doc.specialty}</p>
                  <p className="cofounder-bio">{doc.bio}</p>
                  <ul className="cofounder-quals">
                    {doc.qualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
