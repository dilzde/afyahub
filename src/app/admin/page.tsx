"use client";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

const cards = [
  { href: "/admin/doctors", label: "Doctors", desc: "Add, edit or remove doctor profiles and co-founders", icon: "👨‍⚕️" },
  { href: "/admin/services", label: "Services", desc: "Update procedures and service descriptions", icon: "🏥" },
  { href: "/admin/images", label: "Images", desc: "Replace facility and section images with your own", icon: "🖼️" },
  { href: "/admin/settings", label: "Settings", desc: "Update hours, phone, email, location", icon: "⚙️" },
];

export default function AdminPage() {
  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <Link href="/" className="btn" style={{ fontSize: ".82rem", padding: ".6rem 1.2rem" }}>View site →</Link>
      </div>
      <p style={{ color: "var(--ink-soft)", marginBottom: "2rem" }}>
        Welcome to the AfyaHub admin panel. Use the sections below to manage your site content.
      </p>
      <div className="admin-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} style={{ textDecoration: "none" }}>
            <div className="admin-card" style={{ cursor: "pointer", transition: "box-shadow .25s", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <span style={{ fontSize: "2rem" }}>{c.icon}</span>
              <strong style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)" }}>{c.label}</strong>
              <p style={{ color: "var(--ink-soft)", fontSize: ".88rem" }}>{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
