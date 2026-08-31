"use client";
import { useState, useRef } from "react";

interface Settings {
  contact: { phone: string; email: string; address: string; addressDetail: string };
}

interface FormData {
  name: string; email: string; phone: string; service: string; date: string; message: string;
}

const SERVICES = ["Consultations", "Laparoscopy", "Minor theatre", "Colonoscopy & endoscopy", "Not sure — general enquiry"];

function buildMailto(d: FormData, email: string) {
  const body = `Name: ${d.name}\nEmail: ${d.email}\n${d.phone ? "Phone: " + d.phone + "\n" : ""}Service: ${d.service}\n${d.date ? "Preferred date: " + d.date + "\n" : ""}${d.message ? "Notes: " + d.message + "\n" : ""}`;
  return `mailto:${email}?subject=${encodeURIComponent("Appointment request: " + d.service)}&body=${encodeURIComponent(body)}`;
}

export default function BookingForm({ settings, preselectedService }: { settings: Settings; preselectedService?: string }) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", service: preselectedService || "", date: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.service) errs.service = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = buildMailto(form, settings.contact.email);
    setMailtoUrl(url);
    window.location.href = url;
    setSent(true);
  };

  const reset = () => { setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" }); setSent(false); setMailtoUrl(""); setErrors({}); };

  return (
    <section className="booking" id="book">
      <div className="wrap">
        <div className="booking-grid">
          <div>
            <div className="section-head" data-reveal="" style={{ marginBottom: "2rem" }}>
              <p className="overline">Appointments</p>
              <h2 className="h2">Book an appointment</h2>
              <p>Fill this in and we&apos;ll open a pre-written email for you to send straight to our appointments desk.</p>
            </div>
            {!sent ? (
              <form className="book-form" onSubmit={handleSubmit} noValidate data-reveal="">
                <div className="f-row">
                  <div className={`field${errors.name ? " invalid" : ""}`} data-field="name">
                    <label htmlFor="f-name">Full name *</label>
                    <input type="text" id="f-name" name="name" placeholder="e.g. Amina Yusuf" autoComplete="name" value={form.name} onChange={set("name")} />
                    <p className="err">Please enter your full name.</p>
                  </div>
                  <div className={`field${errors.email ? " invalid" : ""}`} data-field="email">
                    <label htmlFor="f-email">Email address *</label>
                    <input type="email" id="f-email" name="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={set("email")} />
                    <p className="err">Please enter a valid email address.</p>
                  </div>
                </div>
                <div className="f-row">
                  <div className="field">
                    <label htmlFor="f-phone">Phone <span style={{ opacity: 0.4, fontWeight: 400 }}>(optional)</span></label>
                    <input type="tel" id="f-phone" name="phone" placeholder="0721 XXX XXX" autoComplete="tel" value={form.phone} onChange={set("phone")} />
                  </div>
                  <div className={`field${errors.service ? " invalid" : ""}`} data-field="service">
                    <label htmlFor="f-service">Service *</label>
                    <select id="f-service" name="service" value={form.service} onChange={set("service")}>
                      <option value="" disabled>Choose a service…</option>
                      {SERVICES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <p className="err">Please choose a service.</p>
                  </div>
                </div>
                <div className="f-row">
                  <div className="field">
                    <label htmlFor="f-date">Preferred date <span style={{ opacity: 0.4, fontWeight: 400 }}>(optional)</span></label>
                    <input type="date" id="f-date" name="date" value={form.date} onChange={set("date")} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-msg">Anything we should know? <span style={{ opacity: 0.4, fontWeight: 400 }}>(optional)</span></label>
                    <input type="text" id="f-msg" name="message" placeholder="Briefly describe your concern" value={form.message} onChange={set("message")} />
                  </div>
                </div>
                <button type="submit" className="btn on-dark">
                  Send Appointment Request
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <p className="form-note">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
                  </svg>
                  Your details are used only to arrange your appointment — never for marketing.
                </p>
              </form>
            ) : (
              <div className="success show">
                <div className="ok-ring">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                </div>
                <h3>Request ready to send</h3>
                <p className="sum-note">Your email app should have opened with the request pre-written — just press send.</p>
                <dl className="summary">
                  <div><dt>Name</dt><dd>{form.name}</dd></div>
                  <div><dt>Email</dt><dd>{form.email}</dd></div>
                  {form.phone && <div><dt>Phone</dt><dd>{form.phone}</dd></div>}
                  <div><dt>Service</dt><dd>{form.service}</dd></div>
                  {form.date && <div><dt>Date</dt><dd>{form.date}</dd></div>}
                  {form.message && <div><dt>Notes</dt><dd>{form.message}</dd></div>}
                </dl>
                <div className="success-actions">
                  <a className="btn on-dark" href={mailtoUrl}>
                    Open email again
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
                <button className="link-reset" onClick={reset}>Make another request</button>
              </div>
            )}
          </div>
          <aside data-reveal="">
            <div className="next-steps">
              <h3>What happens next</h3>
              <ul className="next-list">
                <li><b>i.</b><div><strong>We read it the same working day</strong><p>Every request lands directly on the appointments desk — no inboxes in between.</p></div></li>
                <li><b>ii.</b><div><strong>We confirm your slot</strong><p>By email or phone, usually within one working day.</p></div></li>
                <li><b>iii.</b><div><strong>You arrive prepared</strong><p>Any prep instructions — like bowel prep for a colonoscopy — come in writing, before your visit.</p></div></li>
              </ul>
            </div>
            <div className="direct">
              <a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5c0-1 3-2 4 0l1.5 3-2 2c1 2.5 3.5 5 6 6l2-2 3 1.5c2 1 1 4 0 4C17 20 5 17 4 8 3.8 6.8 4 5.6 4 5z" />
                </svg>
                {settings.contact.phone}
              </a>
              <div className="loc">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                  {settings.contact.address}
                  <small>{settings.contact.addressDetail}</small>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
