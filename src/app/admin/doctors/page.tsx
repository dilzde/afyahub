"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import DoctorAvatar from "@/components/DoctorAvatar";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  qualifications: string[];
  image: string;
  isCofounder: boolean;
  order: number;
}

const empty: Omit<Doctor, "id" | "order"> = {
  name: "",
  title: "",
  specialty: "",
  bio: "",
  qualifications: [],
  image: "",
  isCofounder: false,
};

export default function DoctorsAdmin() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState(empty);
  const [qualsText, setQualsText] = useState("");
  const [saved, setSaved] = useState(false);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = () => {
    fetch("/api/admin/doctors")
      .then((r) => r.json())
      .then(setDoctors)
      .catch(() => {});
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openAdd = () => {
    setForm(empty);
    setQualsText("");
    setEditing(null);
    setModal("add");
  };

  const openEdit = (d: Doctor) => {
    setForm({
      name: d.name,
      title: d.title,
      specialty: d.specialty,
      bio: d.bio,
      qualifications: d.qualifications || [],
      image: d.image || "",
      isCofounder: d.isCofounder,
    });
    setQualsText((d.qualifications || []).join(", "));
    setEditing(d);
    setModal("edit");
  };

  const closeModal = () => setModal(null);

  const setF = (k: keyof typeof empty) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = k === "isCofounder" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const save = async () => {
    if (!form.name.trim()) return;
    setLoading(true);
    const quals = qualsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = { ...form, qualifications: quals };

    let updated: Doctor[];
    if (modal === "add") {
      const id = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `doc-${Date.now()}`;
      const newDoc: Doctor = { ...payload, id, order: doctors.length + 1 };
      updated = [...doctors, newDoc];
    } else if (editing) {
      updated = doctors.map((d) => (d.id === editing.id ? { ...d, ...payload } : d));
    } else {
      updated = doctors;
    }

    await persist(updated);
    setLoading(false);
    closeModal();
  };

  const remove = async (id: string) => {
    setLoading(true);
    const updated = doctors.filter((d) => d.id !== id);
    await persist(updated);
    setLoading(false);
    setDelConfirm(null);
  };

  const persist = async (data: Doctor[]) => {
    await fetch("/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setDoctors(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell>
      <div className="admin-header">
        <div>
          <h1>Doctors &amp; Specialists</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", marginTop: "0.2rem" }}>
            Add, update or remove doctors and co-founders. Changes update live across the website.
          </p>
        </div>
        <button className="btn" style={{ fontSize: ".82rem", padding: ".6rem 1.2rem" }} onClick={openAdd}>
          + Add Doctor
        </button>
      </div>

      {saved && (
        <div
          style={{
            background: "#e8f5e9",
            color: "#2e7d32",
            borderRadius: 10,
            padding: ".75rem 1rem",
            marginBottom: "1rem",
            fontSize: ".88rem",
            fontWeight: 600,
          }}
        >
          ✓ Changes saved and updated live on the site!
        </div>
      )}

      <div className="admin-grid">
        {doctors.map((d) => (
          <div key={d.id} className="doctor-card-admin">
            <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
              <DoctorAvatar name={d.name} image={d.image} aspectRatio="16/9" />
            </div>
            <div className="doctor-card-body">
              {d.isCofounder && (
                <span
                  style={{
                    fontSize: ".65rem",
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: ".25rem",
                    display: "block",
                  }}
                >
                  Co-Founder
                </span>
              )}
              <h3>{d.name}</h3>
              <p style={{ fontWeight: 500, color: "var(--ink)" }}>{d.title}</p>
              <p style={{ fontSize: ".8rem", color: "var(--ink-soft)", marginTop: ".1rem" }}>{d.specialty}</p>
              
              <div style={{ margin: "0.5rem 0", display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {(d.qualifications || []).map((q, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.68rem",
                      background: "var(--paper-soft)",
                      border: "1px solid var(--line)",
                      borderRadius: "980px",
                      padding: "0.15rem 0.5rem",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {q}
                  </span>
                ))}
              </div>

              <div className="doctor-card-actions">
                <button className="btn-sm btn-edit" onClick={() => openEdit(d)}>
                  Edit Details
                </button>
                <button className="btn-sm btn-danger" onClick={() => setDelConfirm(d.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation modal */}
      {delConfirm && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 380 }}>
            <h2>Remove Doctor?</h2>
            <p style={{ color: "var(--ink-soft)", fontSize: ".92rem", marginBottom: "1.5rem" }}>
              Are you sure you want to remove this doctor? This change will reflect live on the website immediately.
            </p>
            <div className="modal-actions">
              <button className="btn-sm btn-danger" onClick={() => remove(delConfirm)} disabled={loading}>
                {loading ? "Removing..." : "Yes, remove"}
              </button>
              <button className="btn-sm btn-edit" onClick={() => setDelConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{modal === "add" ? "Add New Doctor" : "Edit Doctor"}</h2>
            <div className="admin-form">
              <label>Full Name *</label>
              <input value={form.name} onChange={setF("name")} placeholder="e.g. Dr. Madaraka Ogoye" required />
              
              <label>Title / Role *</label>
              <input value={form.title} onChange={setF("title")} placeholder="e.g. Co-Founder & Lead Surgeon" />
              
              <label>Specialty *</label>
              <input value={form.specialty} onChange={setF("specialty")} placeholder="e.g. General & Laparoscopic Surgery" />
              
              <label>Bio / Description</label>
              <textarea
                value={form.bio}
                onChange={setF("bio")}
                rows={4}
                placeholder="Doctor's background and experience..."
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid var(--line)",
                  padding: ".7rem",
                  font: "inherit",
                  marginBottom: ".8rem",
                }}
              />
              
              <label>Qualifications (comma-separated)</label>
              <input
                value={qualsText}
                onChange={(e) => setQualsText(e.target.value)}
                placeholder="e.g. MBChB, MMed (Surgery), FCSA"
              />
              
              <label>Photo URL (Leave blank to use clean placeholder avatar)</label>
              <input
                value={form.image}
                onChange={setF("image")}
                placeholder="https://... or leave empty for avatar placeholder"
              />
              
              <div style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".6rem",
                    textTransform: "none",
                    letterSpacing: 0,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.isCofounder}
                    onChange={setF("isCofounder")}
                    style={{ width: "auto", marginBottom: 0 }}
                  />
                  Feature in Co-Founders section (Our Story)
                </label>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={save} disabled={loading}>
                {loading ? "Saving..." : "Save Doctor"}
              </button>
              <button
                className="btn-sm btn-edit"
                onClick={closeModal}
                style={{ background: "var(--paper-soft)", color: "var(--ink)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
