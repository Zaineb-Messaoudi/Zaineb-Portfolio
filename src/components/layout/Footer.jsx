import { footerLinks, footerNavLinks, personal } from "../../data/portfolioData";
import { localize, useLanguage } from "../../i18n";

function Footer() {
  const { language, t } = useLanguage();
  const localizedPersonal = localize(personal, language);
  const localizedNavLinks = localize(footerNavLinks, language);
  const localizedFooterLinks = localize(footerLinks, language);
  const year = new Date().getFullYear();
  return (
    <footer className="footer container" aria-labelledby="footer-heading">
      <div className="section-inner footer-shell">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <div className="footer-brand">
              <span className="footer-brand-mark" aria-hidden="true">
                <img
                  className="footer-logo"
                  src={personal.logoDark}
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  onError={(event) => { event.currentTarget.style.display = "none"; }}
                />
                <span>ZM</span>
              </span>
              <div>
                <p className="eyebrow">{t("Portfolio")}</p>
                <h2 id="footer-heading" className="footer-title">{localizedPersonal.name}</h2>
              </div>
            </div>
            <p className="footer-copy">{t("Software Engineering student focused on full-stack systems, applied AI, accessibility, and polished digital products.")}</p>
            <div className="footer-status"><span className="footer-status-dot" aria-hidden="true" />{t("Open to 6+ month PFE opportunities from January 2027")}</div>
          </div>
          <div className="footer-column"><h3 className="footer-heading">{t("Explore")}</h3><div className="footer-link-list">{localizedNavLinks.map((link) => <a key={link.label} className="footer-text-link" href={link.href}>{link.label}</a>)}</div></div>
          <div className="footer-column"><h3 className="footer-heading">{t("Connect")}</h3><div className="footer-link-list">{localizedFooterLinks.map((link) => <a key={link.label} className="footer-text-link" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label}</a>)}</div></div>
          <div className="footer-column"><h3 className="footer-heading">{t("Contact")}</h3><div className="footer-contact-list"><a className="footer-contact-item" href={`mailto:${localizedPersonal.email}`}>{localizedPersonal.email}</a><span className="footer-contact-item">{localizedPersonal.location}</span></div></div>
        </div>
        <div className="footer-bottom"><p className="footer-copy">© {year} {localizedPersonal.name}. {t("A world to explore, not a document to scan.")}</p><a className="button button-secondary footer-cta" href="#hero">{t("Back to top")}</a></div>
      </div>
    </footer>
  );
}

export default Footer;
