import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import RevealInit from "@/components/RevealInit";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request an appointment at AfyaHub for consultations, laparoscopy, minor theatre, or endoscopy in Nairobi. We respond within one working day.",
  openGraph: {
    title: "Book an Appointment | AfyaHub",
    description: "Request a consultation or procedure at AfyaHub, Nairobi.",
  },
};

export default async function AppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const settings = getSettings();

  return (
    <>
      <RevealInit />
      <div className="page-hero">
        <div className="wrap">
          <p className="overline" style={{ color: "rgba(255,255,255,0.5)" }}>Appointments</p>
          <h1>Book your appointment</h1>
          <p>We&apos;ll confirm your slot within one working day — by email or phone.</p>
        </div>
      </div>
      <BookingForm settings={settings} preselectedService={params.service} />
    </>
  );
}
