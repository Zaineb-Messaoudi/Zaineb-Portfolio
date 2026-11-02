import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, personal } from "../../data/portfolioData";
import { localize, useLanguage } from "../../i18n";

function scrollToSection(id) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ block: "start" });
}

function Navbar({ activeSection, language, onChangeLanguage, onNavigate }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1080) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavigate = (id) => {
    setOpen(false);
    if (onNavigate) onNavigate(id);
    else scrollToSection(id);
  };

  return (
    <div className="navbar-wrap container">
      <a className="skip-link" href="#main-content">{t("Skip to main content")}</a>
      <nav className="navbar" aria-label={language === "fr" ? "Navigation principale" : "Primary navigation"}>
        <div className="brand">
          <img className="brand-logo" src={personal.logoDark} alt="" aria-hidden="true" width="96" height="96" decoding="async" />
          <div className="brand-copy"><strong>{personal.name}</strong><span>{t("Software Engineering Portfolio")}</span></div>
        </div>
        <div className="nav-links">
          {localize(navItems, language).map((item) => <button key={item.id} type="button" className="nav-link" aria-current={activeSection === item.id ? "location" : undefined} onClick={() => handleNavigate(item.id)}>{item.label}</button>)}
        </div>
        <div className="nav-actions">
          <button type="button" className="language-button" onClick={() => onChangeLanguage(language === "en" ? "fr" : "en")} aria-label={language === "en" ? "Passer au français" : "Switch to English"}>{language === "en" ? "FR" : "EN"}</button>
          <button type="button" className="menu-button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? t("Close navigation menu") : t("Open navigation menu")} onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      {open ? (
        <div className="modal-backdrop mobile-nav-backdrop" onClick={() => setOpen(false)}>
          <div id="mobile-nav" className="modal-card mobile-nav-panel" role="dialog" aria-modal="true" aria-label={language === "fr" ? "Menu de navigation mobile" : "Mobile navigation menu"} onClick={(event) => event.stopPropagation()}>
            <div className="modal-top"><div><p className="eyebrow">{t("Navigate")}</p><h2 className="section-title">{t("Explore the portfolio")}</h2></div><button type="button" className="close-button" onClick={() => setOpen(false)} aria-label={t("Close navigation menu")}><X size={18} /></button></div>
            <div className="modal-content">{localize(navItems, language).map((item) => <button key={item.id} type="button" className="button button-secondary" onClick={() => handleNavigate(item.id)}>{item.label}</button>)}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
