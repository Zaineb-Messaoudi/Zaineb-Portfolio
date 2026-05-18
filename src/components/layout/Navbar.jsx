import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, personal } from "../../data/portfolioData";

function scrollToSection(id) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1080) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavigate = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="navbar-wrap container">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <nav className="navbar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-copy">
            <strong>{personal.name}</strong>
            <span>Software Engineering Portfolio</span>
          </div>
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav-link"
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={() => handleNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="modal-backdrop mobile-nav-backdrop" onClick={() => setOpen(false)}>
          <div
            id="mobile-nav"
            className="modal-card mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-top">
              <div>
                <p className="eyebrow">Navigate</p>
                <h2 className="section-title">Explore the portfolio</h2>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-content">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="button button-secondary"
                  onClick={() => handleNavigate(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
