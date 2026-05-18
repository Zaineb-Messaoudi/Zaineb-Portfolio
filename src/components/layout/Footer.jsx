import { footerLinks, footerNavLinks, personal } from "../../data/portfolioData";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer container" aria-labelledby="footer-heading">
      <div className="section-inner footer-shell">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <p className="eyebrow">Portfolio</p>
            <h2 id="footer-heading" className="footer-title">
              {personal.name}
            </h2>
            <p className="footer-copy">
              Software Engineering student focused on full-stack systems,
              applied AI, accessibility, and polished digital products.
            </p>
            <div className="footer-status">
              <span className="footer-status-dot" aria-hidden="true" />
              Open to Summer 2026 internship opportunities
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Explore</h3>
            <div className="footer-link-list">
              {footerNavLinks.map((link) => (
                <a key={link.label} className="footer-text-link" href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Connect</h3>
            <div className="footer-link-list">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  className="footer-text-link"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Contact</h3>
            <div className="footer-contact-list">
              <a className="footer-contact-item" href={`mailto:${personal.email}`}>
                {personal.email}
              </a>
              <a
                className="footer-contact-item"
                href={`tel:${personal.phone.replace(/\s+/g, "")}`}
              >
                {personal.phone}
              </a>
              <span className="footer-contact-item">{personal.location}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} {personal.name}. Designed for a recruiter-ready, accessible
            portfolio experience.
          </p>
          <a className="button button-secondary footer-cta" href="#hero">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
