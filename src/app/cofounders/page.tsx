import type { Metadata } from "next";
import Cofounders from "@/components/Cofounders";
import Ethos from "@/components/Ethos";
import RevealInit from "@/components/RevealInit";
import { getDoctors, getImages } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Story & Co-Founders",
  description:
    "Learn how Dr. Madaraka Ogoye and Dr. Misheck Wanjiku founded AfyaHub to bring world-class surgical and endoscopic care to Nairobi families.",
  openGraph: { title: "Our Story | AfyaHub" },
};

export default function CofoundersPage() {
  const doctors = getDoctors();
  const images = getImages();

  return (
    <>
      <RevealInit />
      <div className="page-hero">
        <div className="wrap">
          <p className="overline" style={{ color: "rgba(255,255,255,0.5)" }}>Our story</p>
          <h1>Built on conviction</h1>
          <p>AfyaHub was founded by clinicians who refused to accept that quality surgical care had to come with a long journey or a long wait.</p>
        </div>
      </div>
      <Ethos ethosImage={images.ethos} />
      <Cofounders doctors={doctors} />
    </>
  );
}
