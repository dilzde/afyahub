import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Ethos from "@/components/Ethos";
import Cofounders from "@/components/Cofounders";
import Team from "@/components/Team";
import Journey from "@/components/Journey";
import Faq from "@/components/Faq";
import RevealInit from "@/components/RevealInit";
import settingsData from "../../data/settings.json";
import servicesData from "../../data/services.json";
import doctorsData from "../../data/doctors.json";
import imagesData from "../../data/images.json";

export const metadata: Metadata = {
  title: "AfyaHub — Expert Surgical & Endoscopic Care in Nairobi",
  description:
    "Consultant-led consultations, laparoscopic surgery, day-case theatre and endoscopy in Nairobi, Kenya. Book online — same-day response.",
};

export default function Home() {
  return (
    <>
      <RevealInit />
      <Hero settings={settingsData} heroImage={imagesData.hero} />
      <Services services={servicesData} />
      <Ethos ethosImage={imagesData.ethos} />
      <Cofounders doctors={doctorsData} />
      <Team teamImage={imagesData.team} />
      <Journey />
      <Faq />
    </>
  );
}
