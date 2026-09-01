"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";

interface Service {
  id: string;
  name: string;
  brief: string;
  tag: string;
  icon: string;
  color?: string;
  description: string;
  procedures: string[];
}

const emptyService: Omit<Service, "id"> = {
  name: "",
  brief: "",
  tag: "Clinic",
  icon: "users",
  color: "accent",
  description: "",
  procedures: [],
};

const iconOptions = [
  { value: "users", label: "Consultations / People (Users)" },
  { value: "sun", label: "Laparoscopy / Precision (Sun / Scope)" },
  { value: "file", label: "Minor Theatre / Day Case (Document)" },
  { value: "monitor", label: "Endoscopy / Imaging (Monitor Screen)" },
  { value: "heart", label: "Cardio / Care (Heart)" },
  { value: "shield", label: "Diagnostics / General (Shield)" },
];

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);
  const [procsText, setProcsText] = useState("");
  const [saved, setSaved] = useState(false);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const [quickProcInput, setQuickProcInput] = useState<{ [serviceId: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const fetchServices = () => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then(setServices)
      .catch(() => {});
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAdd = () => {
    setForm(emptyService);
    setProcsText("");
    setEditing(null);
    setModal("add");
  };

  const openEdit = (s: Service) => {
    setForm({
      name: s.name,
      brief: s.brief,
      tag: s.tag,
      icon: s.icon || "users",
      color: s.color || "accent",
      description: s.description,
      procedures: s.procedures || [],
    });
    setProcsText((s.procedures || []).join("\n"));
    setEditing(s);
    setModal("edit");
  };

  const closeModal = () => setModal(null);

  const setF = (k: keyof typeof emptyService) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const save = async () => {
    if (!form.name.trim()) return;
    setLoading(true);
    const procs = procsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = { ...form, procedures: procs };

    let updated: Service[];
    if (modal === "add") {
      const id = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `service-${Date.now()}`;
      const newService: Service = { ...payload, id };
      updated = [...services, newService];
    } else if (editing) {
      updated = services.map((s) => (s.id === editing.id ? { ...editing, ...payload } : s));
    } else {
      updated = services;
    }

    await persist(updated);
    setLoading(false);
    closeModal();
  };

  const removeService = async (id: string) => {
    setLoading(true);
    const updated = services.filter((s) => s.id !== id);
    await persist(updated);
    setLoading(false);
    setDelConfirm(null);
  };

  const persist = async (data: Service[]) => {
    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setServices(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Quick procedure add directly on the card
  const addQuickProcedure = async (serviceId: string) => {
    const text = (quickProcInput[serviceId] || "").trim();
    if (!text) return;
    const updated = services.map((s) => {
      if (s.id === serviceId) {
        return { ...s, procedures: [...(s.procedures || []), text] };
      }
      return s;
    });
    await persist(updated);
    setQuickProcInput((prev) => ({ ...prev, [serviceId]: "" }));
  };

  // Quick procedure remove
  const removeProcedure = async (serviceId: string, procIndex: number) => {
    const updated = services.map((s) => {
      if (s.id === serviceId) {
        const nextProcs = [...s.procedures];
        nextProcs.splice(procIndex, 1);
        return { ...s, procedures: nextProcs };
      }
      return s;
    });
    await persist(updated);
  };

  return (
    <AdminShell>
      <div className="admin-header">
        <div>
          <h1>Services &amp; Procedures</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", marginTop: "0.2rem" }}>
            Add new service sections, delete sections, or add/remove specific procedures.
          </p>
        </div>
        <button className="btn" style={{ fontSize: ".82rem", padding: ".6rem 1.2rem" }} onClick={openAdd}>
          + Add New Service Section
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
          ✓ Services and procedures updated live on the site!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {services.map((s) => (
          <div key={s.id} className="admin-card" style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
                  <strong style={{ fontSize: "1.2rem", fontWeight: 600 }}>{s.name}</strong>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      background: "var(--accent-lite)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "980px",
                    }}
                  >
                    {s.tag || "Specialty"}
                  </span>
                </div>
                <p style={{ color: "var(--ink-soft)", fontSize: ".9rem", fontWeight: 500 }}>{s.brief}</p>
                <p style={{ color: "var(--ink-soft)", fontSize: ".85rem", marginTop: "0.4rem", maxWidth: "65ch" }}>
                  {s.description}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn-sm btn-edit" onClick={() => openEdit(s)}>
                  Edit Section
                </button>
                <button className="btn-sm btn-danger" onClick={() => setDelConfirm(s.id)}>
                  Remove Section
                </button>
              </div>
            </div>

            {/* Procedures Management */}
            <div
              style={{
                marginTop: "1.2rem",
                paddingTop: "1.2rem",
                borderTop: "1px solid var(--line)",
              }}
            >
              <p
                style={{
                  fontSize: ".75rem",
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  marginBottom: ".6rem",
                }}
              >
                Procedures in this service ({s.procedures?.length || 0})
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "1rem" }}>
                {(s.procedures || []).map((p, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: ".82rem",
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      borderRadius: "980px",
                      padding: ".3rem .75rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                  >
                    <span>{p}</span>
                    <button
                      type="button"
                      onClick={() => removeProcedure(s.id, i)}
                      title="Remove procedure"
                      style={{
                        color: "var(--ink-faint)",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        lineHeight: 1,
                        padding: "0 2px",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--error)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink-faint)")}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Add Procedure Input */}
              <div style={{ display: "flex", gap: "0.6rem", maxWidth: "480px" }}>
                <input
                  type="text"
                  placeholder="+ Add new procedure (e.g. Diagnostic review)"
                  value={quickProcInput[s.id] || ""}
                  onChange={(e) =>
                    setQuickProcInput((prev) => ({ ...prev, [s.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addQuickProcedure(s.id);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: "0.5rem 0.8rem",
                    fontSize: "0.85rem",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--paper-soft)",
                    marginBottom: 0,
                  }}
                />
                <button
                  type="button"
                  className="btn-sm btn-edit"
                  onClick={() => addQuickProcedure(s.id)}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Add Procedure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {delConfirm && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 380 }}>
            <h2>Remove Service Section?</h2>
            <p style={{ color: "var(--ink-soft)", fontSize: ".92rem", marginBottom: "1.5rem" }}>
              Are you sure you want to remove this service section and all its procedures?
            </p>
            <div className="modal-actions">
              <button className="btn-sm btn-danger" onClick={() => removeService(delConfirm)} disabled={loading}>
                {loading ? "Removing..." : "Yes, remove section"}
              </button>
              <button className="btn-sm btn-edit" onClick={() => setDelConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Section Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{modal === "add" ? "Add New Service Section" : `Edit Section — ${editing?.name}`}</h2>
            <div className="admin-form">
              <label>Service Section Name *</label>
              <input
                value={form.name}
                onChange={setF("name")}
                placeholder="e.g. Laparoscopic Surgery"
                required
              />

              <label>Tagline / Brief Subtitle *</label>
              <input
                value={form.brief}
                onChange={setF("brief")}
                placeholder="e.g. Keyhole surgery & minimally invasive procedures"
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label>Tag Badge</label>
                  <input
                    value={form.tag}
                    onChange={setF("tag")}
                    placeholder="e.g. Theatre, Clinic, Day case"
                  />
                </div>
                <div>
                  <label>Icon Style</label>
                  <select value={form.icon} onChange={setF("icon")}>
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label>Full Description *</label>
              <textarea
                value={form.description}
                onChange={setF("description")}
                rows={4}
                placeholder="Detailed description of what this service offers..."
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid var(--line)",
                  padding: ".7rem",
                  font: "inherit",
                  marginBottom: ".8rem",
                }}
              />

              <label>Procedures (one per line)</label>
              <textarea
                value={procsText}
                onChange={(e) => setProcsText(e.target.value)}
                rows={5}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid var(--line)",
                  padding: ".7rem",
                  font: "inherit",
                  marginBottom: ".8rem",
                }}
                placeholder={"Laparoscopic cholecystectomy (gallbladder)\nAppendicectomy\nHernia repair"}
              />
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={save} disabled={loading}>
                {loading ? "Saving..." : "Save Service Section"}
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
