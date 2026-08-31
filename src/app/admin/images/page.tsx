"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";

interface Images { hero: string; ethos: string; team: string; facility: string[]; }

export default function ImagesAdmin() {
  const [images, setImages] = useState<Images>({ hero: "", ethos: "", team: "", facility: [] });
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/admin/images").then(r => r.json()).then(setImages).catch(() => {}); }, []);

  const set = (k: keyof Images) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setImages(im => ({ ...im, [k]: e.target.value }));

  const setFacility = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setImages(im => { const f = [...im.facility]; f[i] = e.target.value; return { ...im, facility: f }; });

  const addFacility = () => setImages(im => ({ ...im, facility: [...im.facility, ""] }));
  const removeFacility = (i: number) => setImages(im => ({ ...im, facility: im.facility.filter((_, j) => j !== i) }));

  const save = async () => {
    await fetch("/api/admin/images", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(images) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const thumbs = [
    { label: "Hero (homepage background)", key: "hero" as const, url: images.hero },
    { label: "Ethos section", key: "ethos" as const, url: images.ethos },
    { label: "Team section", key: "team" as const, url: images.team },
  ];

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Images</h1>
        <button className="btn" style={{ fontSize: ".82rem", padding: ".6rem 1.2rem" }} onClick={save}>Save all</button>
      </div>
      {saved && <div style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: 10, padding: ".75rem 1rem", marginBottom: "1rem", fontSize: ".88rem", fontWeight: 600 }}>✓ Saved successfully</div>}
      <p style={{ color: "var(--ink-soft)", marginBottom: "1.5rem", fontSize: ".9rem" }}>
        Paste image URLs below. For best quality, use images at least 1200px wide for the hero and 800px for other sections. Unsplash links work great as placeholders.
      </p>

      <div className="admin-card">
        <h2>Section Images</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
          {thumbs.map(({ label, key, url }) => (
            <div key={key} className="admin-form">
              <div className="image-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {url ? <img src={url} alt={label} /> : <div style={{ height: 160, background: "var(--paper-soft)", display: "grid", placeItems: "center", color: "var(--ink-faint)", fontSize: ".85rem" }}>No image</div>}
                <div className="image-thumb-label">{label}</div>
              </div>
              <label>Image URL</label>
              <input value={url} onChange={set(key)} placeholder="https://images.unsplash.com/…" />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Facility Gallery
          <button className="btn-sm btn-edit" onClick={addFacility}>+ Add image</button>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1rem" }}>
          {images.facility.map((url, i) => (
            <div key={i} className="admin-form">
              <div className="image-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {url ? <img src={url} alt={`Facility ${i + 1}`} /> : <div style={{ height: 160, background: "var(--paper-soft)", display: "grid", placeItems: "center", color: "var(--ink-faint)", fontSize: ".85rem" }}>No image</div>}
                <div className="image-thumb-label">Facility image {i + 1}</div>
              </div>
              <input value={url} onChange={setFacility(i)} placeholder="https://…" />
              <button className="btn-sm btn-danger" style={{ marginTop: ".4rem" }} onClick={() => removeFacility(i)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button className="btn" onClick={save}>Save all images</button>
      </div>
    </AdminShell>
  );
}
