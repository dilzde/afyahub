import Link from "next/link";

interface Settings {
  contact: { phone: string; email: string; address: string; addressDetail: string };
  hours: { days: string; hours: string }[];
}

export default function Footer({ settings }: { settings: Settings }) {
  const { contact } = settings;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <Link href="/" className="brand">
              <svg className="brand-mark" width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" rx="14" fill="#C4563A" />
                <path d="M8 32h14l4-12 6 24 5-12h19" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="brand-name">Afya<em>Hub</em></span>
            </Link>
            <p className="footer-blurb">Consultant-led surgical and endoscopic care in Nairobi. Small incisions, big expertise.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services#consultations">Consultations</Link></li>
              <li><Link href="/services#laparoscopy">Laparoscopy</Link></li>
              <li><Link href="/services#minor-theatre">Minor Theatre</Link></li>
              <li><Link href="/services#endoscopy">Endoscopy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="/cofounders">Our Story</Link></li>
              <li><Link href="/visit">Your Visit</Link></li>
              <li><Link href="/appointment">Book Appointment</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="direct">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5c0-1 3-2 4 0l1.5 3-2 2c1 2.5 3.5 5 6 6l2-2 3 1.5c2 1 1 4 0 4C17 20 5 17 4 8 3.8 6.8 4 5.6 4 5z" />
                </svg>
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
                </svg>
                {contact.email}
              </a>
              <div className="loc">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                  {contact.address}
                  <small>{contact.addressDetail}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AfyaHub. All rights reserved.</span>
          <span>Designed with care in Nairobi</span>
        </div>
      </div>
    </footer>
  );
}
