"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";

interface Doctor {
  id: string; name: string; title: string; specialty: string;
  bio: string; qualifications: string[]; image: string; isCofounder: boolean; order: number;
}

const empty: Omit<Doctor, "id" | "order"> = { name: "", title: "", specialty: "", bio: "", qualifications: [], image: "", isCofounder: false };

export default function DoctorsAdmin() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState(empty);
  const [qualsText, setQualsText] = useState("");
  const [saved, setSaved] = useState(false);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/doctors").then((r) => r.json()).then(setDoctors).catch(() => {});
  }, []);

  const openAdd = () => { setForm(empty); setQualsText(""); setEditing(null); setModal("add"); };
  const openEdit = (d: Doctor) => { setForm({ name: d.name, title: d.title, specialty: d.specialty, bio: d.bio, qualifications: d.qualifications, image: d.image, isCofounder: d.isCofounder }); setQualsText(d.qualifications.join(", ")); setEditing(d); setModal("edit"); };
  const closeModal = () => setModal(null);

  const setF = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = k === "isCofounder" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const save = async () => {
    const quals = qualsText.split(",").map((s) => s.trim()).filter(Boolean);
    const payload = { ...form, qualifications: quals };
    if (modal === "add") {
      const id = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const newDoc: Doctor = { ...payload, id, order: doctors.length + 1 };
      const updated = [...doctors, newDoc];
      await persist(updated);
    } else if (editing) {
      const updated = doctors.map((d) => d.id === editing.id ? { ...d, ...payload } : d);
      await persist(updated);
    }
    closeModal();
  };

  const remove = async (id: string) => {
    const updated = doctors.filter((d) => d.id !== id);
    await persist(updated);
    setDelConfirm(null);
  };

  const persist = async (data: Doctor[]) => {
    await fetch("/api/admin/doctors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setDoctors(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Doctors</h1>
        <button className="btn" style={{ fontSize: ".82rem", padding: ".6rem 1.2rem" }} onClick={openAdd}>
          + Add Doctor
        </button>
      </div>
      {saved && <div style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: 10, padding: ".75rem 1rem", marginBottom: "1rem", fontSize: ".88rem", fontWeight: 600 }}>✓ Saved successfully</div>}
      <div className="admin-grid">
        {doctors.map((d) => (
          <div key={d.id} className="doctor-card-admin">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image || "https://via.placeholder.com/400x160?text=No+photo"} alt={d.name} />
            <div className="doctor-card-body">
              {d.isCofounder && <span style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: ".25rem", display: "block" }}>Co-Founder</span>}
              <h3>{d.name}</h3>
              <p>{d.title}</p>
              <p style={{ fontSize: ".78rem", color: "var(--ink-faint)", marginTop: ".1rem" }}>{d.specialty}</p>
              <div className="doctor-card-actions">
                <button className="btn-sm btn-edit" onClick={() => openEdit(d)}>Edit</button>
                <button className="btn-sm btn-danger" onClick={() => setDelConfirm(d.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm */}
      {delConfirm && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 360 }}>
            <h2>Remove doctor?</h2>
            <p style={{ color: "var(--ink-soft)", fontSize: ".92rem", marginBottom: "1.5rem" }}>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-sm btn-danger" onClick={() => remove(delConfirm)}>Yes, remove</button>
              <button className="btn-sm btn-edit" onClick={() => setDelConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{modal === "add" ? "Add Doctor" : "Edit Doctor"}</h2>
            <div className="admin-form">
              <label>Full Name</label>
              <input value={form.name} onChange={setF("name")} placeholder="Dr. Jane Doe" />
              <label>Title / Role</label>
              <input value={form.title} onChange={setF("title")} placeholder="Co-Founder & Lead Surgeon" />
              <label>Specialty</label>
              <input value={form.specialty} onChange={setF("specialty")} placeholder="General & Laparoscopic Surgery" />
              <label>Bio</label>
              <textarea value={form.bio} onChange={setF("bio")} rows={4} placeholder="Short biography…" style={{ width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: ".7rem", font: "inherit", marginBottom: ".8rem" }} />
              <label>Qualifications (comma-separated)</label>
              <input value={qualsText} onChange={(e) => setQualsText(e.target.value)} placeholder="MBChB, MMed (Surgery), FCSA" />
              <label>Photo URL</label>
              <input value={form.image} onChange={setF("image")} placeholder="https://…" />
              <label style={{ display: "flex", alignItems: "center", gap: ".5rem", textTransform: "none", letterSpacing: 0 }}>
                <input type="checkbox" checked={form.isCofounder} onChange={setF("isCofounder")} style={{ width: "auto", marginBottom: 0 }} />
                Show on co-founders section
              </label>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={save}>Save</button>
              <button className="btn-sm btn-edit" onClick={closeModal} style={{ background: "var(--paper-soft)", color: "var(--ink)" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
