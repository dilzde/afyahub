"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";

interface Hour { days: string; hours: string; }
interface Settings {
  contact: { phone: string; email: string; address: string; addressDetail: string; };
  hours: Hour[];
  stats: { value: string; label: string; }[];
}

export default function SettingsAdmin() {
  const [data, setData] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/admin/settings").then(r => r.json()).then(setData).catch(() => {}); }, []);

  if (!data) return <AdminShell><p>Loading…</p></AdminShell>;

  const setContact = (k: keyof Settings["contact"]) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => d ? { ...d, contact: { ...d.contact, [k]: e.target.value } } : d);

  const setHour = (i: number, k: keyof Hour) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => { if (!d) return d; const hours = [...d.hours]; hours[i] = { ...hours[i], [k]: e.target.value }; return { ...d, hours }; });

  const setStat = (i: number, k: "value" | "label") => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => { if (!d) return d; const stats = [...d.stats]; stats[i] = { ...stats[i], [k]: e.target.value }; return { ...d, stats }; });

  const save = async () => {
    await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Settings</h1>
        <button className="btn" style={{ fontSize: ".82rem", padding: ".6rem 1.2rem" }} onClick={save}>Save all</button>
      </div>
      {saved && <div style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: 10, padding: ".75rem 1rem", marginBottom: "1rem", fontSize: ".88rem", fontWeight: 600 }}>✓ Saved successfully</div>}

      <div className="admin-card">
        <h2>Contact Information</h2>
        <div className="admin-form settings-row">
          <div><label>Phone</label><input value={data.contact.phone} onChange={setContact("phone")} /></div>
          <div><label>Email</label><input value={data.contact.email} onChange={setContact("email")} /></div>
          <div><label>Address</label><input value={data.contact.address} onChange={setContact("address")} /></div>
          <div><label>Address Detail</label><input value={data.contact.addressDetail} onChange={setContact("addressDetail")} /></div>
        </div>
      </div>

      <div className="admin-card">
        <h2>Opening Hours</h2>
        {data.hours.map((h, i) => (
          <div key={i} className="admin-form settings-row" style={{ marginBottom: ".5rem" }}>
            <div><label>Days</label><input value={h.days} onChange={setHour(i, "days")} placeholder="Mon – Fri" /></div>
            <div><label>Hours</label><input value={h.hours} onChange={setHour(i, "hours")} placeholder="8:00 – 17:00" /></div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2>Homepage Stats (Hero section)</h2>
        {data.stats.map((s, i) => (
          <div key={i} className="admin-form settings-row" style={{ marginBottom: ".5rem" }}>
            <div><label>Value</label><input value={s.value} onChange={setStat(i, "value")} placeholder="Multiple" /></div>
            <div><label>Label</label><input value={s.label} onChange={setStat(i, "label")} placeholder="Consultant specialists" /></div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "right" }}>
        <button className="btn" onClick={save}>Save all settings</button>
      </div>
    </AdminShell>
  );
}
