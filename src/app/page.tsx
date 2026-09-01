import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Ethos from "@/components/Ethos";
import Cofounders from "@/components/Cofounders";
import Team from "@/components/Team";
import Journey from "@/components/Journey";
import Faq from "@/components/Faq";
import RevealInit from "@/components/RevealInit";
import { getDoctors, getServices, getImages, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AfyaHub — Expert Surgical & Endoscopic Care in Nairobi",
  description:
    "Consultant-led consultations, laparoscopic surgery, day-case theatre and endoscopy in Nairobi, Kenya. Book online — same-day response.",
};

export default function Home() {
  const doctors = getDoctors();
  const services = getServices();
  const images = getImages();
  const settings = getSettings();

  return (
    <>
      <RevealInit />
      <Hero settings={settings} heroImage={images.hero} />
      <Services services={services} />
      <Ethos ethosImage={images.ethos} />
      <Cofounders doctors={doctors} />
      <Team teamImage={images.team} />
      <Journey />
      <Faq />
    </>
  );
}
