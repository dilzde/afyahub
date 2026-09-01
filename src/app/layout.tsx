import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Topbar from "@/components/Topbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afyahub.co.ke"),
  title: {
    default: "AfyaHub — Surgical & Endoscopic Care in Nairobi, Kenya",
    template: "%s | AfyaHub",
  },
  description:
    "AfyaHub offers consultant-led consultations, laparoscopic surgery, day-case theatre and endoscopy in Nairobi, Kenya. Book an appointment online.",
  keywords: [
    "AfyaHub",
    "laparoscopic surgery Nairobi",
    "endoscopy Kenya",
    "colonoscopy Nairobi",
    "surgical clinic Nairobi",
    "consultant surgeon Kenya",
    "Westlands medical",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://afyahub.co.ke",
    siteName: "AfyaHub",
    title: "AfyaHub — Surgical & Endoscopic Care in Nairobi",
    description:
      "Consultant-led surgical and endoscopic care. Small incisions, big expertise — close to home in Nairobi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AfyaHub Medical Centre, Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfyaHub — Surgical & Endoscopic Care in Nairobi",
    description:
      "Consultant-led surgical and endoscopic care in Nairobi, Kenya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Topbar settings={settings} />
        <Header />
        <main>{children}</main>
        <Footer settings={settings} />
        <div className="toast" id="toast" role="status" aria-live="polite">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
          <span id="toastMsg"></span>
        </div>
        <button className="to-top" id="toTop" aria-label="Back to top">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </body>
    </html>
  );
}
