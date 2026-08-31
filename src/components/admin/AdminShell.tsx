"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
  { href: "/admin/doctors", label: "Doctors", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
  { href: "/admin/services", label: "Services", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg> },
  { href: "/admin/images", label: "Images", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg> },
  { href: "/admin/settings", label: "Settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [auth, setAuth] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuth(sessionStorage.getItem("afyahub_admin") === "1");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      sessionStorage.setItem("afyahub_admin", "1");
      setAuth(true);
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  if (auth === null) return null; // SSR guard

  if (!auth) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)" }}>
        <div style={{ background: "var(--white)", borderRadius: "16px", padding: "2.5rem", width: "360px", maxWidth: "calc(100vw - 2rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1.5rem" }}>
            <svg width="30" height="30" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#C4563A" /><path d="M8 32h14l4-12 6 24 5-12h19" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>AfyaHub Admin</span>
          </div>
          <form onSubmit={handleLogin}>
            <label style={{ display: "block", fontSize: ".75rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: ".35rem" }}>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ width: "100%", padding: ".75rem 1rem", border: "1px solid var(--line)", borderRadius: "10px", font: "inherit", marginBottom: ".75rem" }}
              autoFocus
            />
            {error && <p style={{ color: "var(--error)", fontSize: ".82rem", marginBottom: ".75rem" }}>{error}</p>}
            <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center" }}>Sign in</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout" style={{ minHeight: "100vh" }}>
      <aside className="admin-sidebar">
        <div className="brand" style={{ padding: "0 1.5rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: "1rem" }}>
          <svg width="28" height="28" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#C4563A" /><path d="M8 32h14l4-12 6 24 5-12h19" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="brand-name" style={{ color: "#fff" }}>Afya<em>Hub</em> <small style={{ opacity: .5, fontSize: ".65rem" }}>Admin</small></span>
        </div>
        <nav className="admin-nav">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? "active" : ""}>
              {n.icon} {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: "auto", padding: "1.5rem" }}>
          <Link href="/" style={{ fontSize: ".8rem", color: "rgba(255,255,255,.4)", display: "flex", gap: ".5rem", alignItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            View site
          </Link>
          <button
            style={{ marginTop: ".75rem", fontSize: ".8rem", color: "rgba(255,255,255,.4)", display: "flex", gap: ".5rem", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => { sessionStorage.removeItem("afyahub_admin"); setAuth(false); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
            Sign out
          </button>
        </div>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  );
}
