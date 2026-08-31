import type { Metadata } from "next";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import RevealInit from "@/components/RevealInit";
import servicesData from "../../../data/services.json";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "AfyaHub offers consultant-led consultations, laparoscopic surgery, minor theatre (day-case) and colonoscopy & endoscopy in Nairobi, Kenya.",
  openGraph: { title: "Our Services | AfyaHub" },
};

export default function ServicesPage() {
  return (
    <>
      <RevealInit />
      <div className="page-hero">
        <div className="wrap">
          <p className="overline" style={{ color: "rgba(255,255,255,0.5)" }}>What we do</p>
          <h1>Our services</h1>
          <p>Four consultant-led specialties, all under one roof in Nairobi. Expand any service to learn more.</p>
        </div>
      </div>
      <Services services={servicesData} />
      <Journey />
    </>
  );
}
