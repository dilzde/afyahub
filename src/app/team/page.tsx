import type { Metadata } from "next";
import Team from "@/components/Team";
import RevealInit from "@/components/RevealInit";
import imagesData from "../../../data/images.json";
import doctorsData from "../../../data/doctors.json";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the consultant surgeons, physicians and endoscopists at AfyaHub, Nairobi — carefully selected for expertise and bedside manner.",
  openGraph: { title: "Our Team | AfyaHub" },
};

export default function TeamPage() {
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
      <Team teamImage={imagesData.team} />
      {/* All non-cofounder doctors */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) 0", background: "var(--paper)" }}>
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <p className="overline">Our doctors</p>
            <h2 className="h2">Meet the team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "2rem" }} data-reveal="">
            {doctorsData.map((doc) => (
              <div key={doc.id} className="cofounder-card">
                <div className="cofounder-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.image} alt={doc.name} loading="lazy" />
                </div>
                <div className="cofounder-body">
                  <p className="cofounder-role">{doc.title}</p>
                  <h3 className="cofounder-name">{doc.name}</h3>
                  <p className="cofounder-specialty">{doc.specialty}</p>
                  <p className="cofounder-bio">{doc.bio}</p>
                  <ul className="cofounder-quals">
                    {doc.qualifications.map((q, i) => <li key={i}>{q}</li>)}
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
