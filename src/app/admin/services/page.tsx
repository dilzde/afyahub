"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";

interface Service { id: string; name: string; brief: string; tag: string; description: string; procedures: string[]; }

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [procsText, setProcsText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/admin/services").then(r => r.json()).then(setServices).catch(() => {}); }, []);

  const openEdit = (s: Service) => { setEditing({ ...s }); setProcsText(s.procedures.join("\n")); };

  const save = async () => {
    if (!editing) return;
    const procs = procsText.split("\n").map(s => s.trim()).filter(Boolean);
    const updated = services.map(s => s.id === editing.id ? { ...editing, procedures: procs } : s);
    await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setServices(updated);
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setE = (k: keyof Service) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditing(ed => ed ? { ...ed, [k]: e.target.value } : ed);

  return (
    <AdminShell>
      <div className="admin-header"><h1>Services</h1></div>
      {saved && <div style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: 10, padding: ".75rem 1rem", marginBottom: "1rem", fontSize: ".88rem", fontWeight: 600 }}>✓ Saved successfully</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {services.map(s => (
          <div key={s.id} className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "1.05rem" }}>{s.name}</strong>
                <p style={{ color: "var(--ink-soft)", fontSize: ".85rem" }}>{s.brief}</p>
              </div>
              <button className="btn-sm btn-edit" onClick={() => openEdit(s)}>Edit</button>
            </div>
            <div style={{ marginTop: ".75rem" }}>
              <p style={{ fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: ".4rem" }}>Procedures</p>
              <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                {s.procedures.map((p, i) => (
                  <li key={i} style={{ fontSize: ".78rem", background: "var(--paper-soft)", border: "1px solid var(--line)", borderRadius: 980, padding: ".2rem .7rem" }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit — {editing.name}</h2>
            <div className="admin-form">
              <label>Service Name</label>
              <input value={editing.name} onChange={setE("name")} />
              <label>Tagline / Brief</label>
              <input value={editing.brief} onChange={setE("brief")} />
              <label>Tag (e.g. Clinic, Theatre)</label>
              <input value={editing.tag} onChange={setE("tag")} />
              <label>Description</label>
              <textarea value={editing.description} onChange={setE("description")} rows={4} style={{ width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: ".7rem", font: "inherit", marginBottom: ".8rem" }} />
              <label>Procedures (one per line)</label>
              <textarea value={procsText} onChange={e => setProcsText(e.target.value)} rows={6} style={{ width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: ".7rem", font: "inherit", marginBottom: ".8rem" }} placeholder={"Laparoscopic cholecystectomy\nAppendicectomy"} />
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={save}>Save</button>
              <button className="btn-sm btn-edit" onClick={() => setEditing(null)} style={{ background: "var(--paper-soft)", color: "var(--ink)" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
