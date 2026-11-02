import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Compass, Map, MapPin, X, Moon, Sun } from "lucide-react";
import { STOPS } from "./GameWorld";

const LABELS = {
  hero: { en: "Start", fr: "Départ" },
  about: { en: "About me", fr: "À propos" },
  summary: { en: "My story", fr: "Mon parcours" },
  experience: { en: "Internships", fr: "Stages" },
  education: { en: "Education", fr: "Formation" },
  projects: { en: "Projects", fr: "Projets" },
  skills: { en: "Skills", fr: "Compétences" },
  contact: { en: "Contact", fr: "Contact" },
};

function JourneyHUD({
  activeSection,
  language,
  mapOpen,
  onMapOpenChange,
  branchCategory,
  onReturnToMainRoad,
  isTraveling,
  travelTargetLabel,
  onSelectStop,
  onDirection,
}) {
  const currentIndex = Math.max(0, STOPS.findIndex((stop) => stop.id === activeSection));
  const currentLabel = LABELS[STOPS[currentIndex].id][language];
  const isFrench = language === "fr";

  return (
    <aside className={`journey-hud ${mapOpen ? "is-expanded" : ""}`} aria-label={isFrench ? "Commandes du parcours" : "Journey controls"}>
      <div className="journey-hud-status">
        <span className="journey-hud-compass" aria-hidden="true"><Compass size={19} /></span>
        <div className="journey-hud-copy" aria-live="polite">
          <span>{isTraveling
            ? (isFrench ? "EN ROUTE VERS" : "WALKING TO")
            : (isFrench ? "POSITION ACTUELLE" : "CURRENT LOCATION")}</span>
          <strong>{isTraveling && travelTargetLabel ? travelTargetLabel : currentLabel}</strong>
        </div>
        <span className="journey-hud-count">{String(currentIndex).padStart(2, "0")} / {String(STOPS.length - 1).padStart(2, "0")}</span>
        <button
          type="button"
          className="journey-hud-toggle"
          aria-expanded={mapOpen}
          aria-controls="journey-hud-map"
          aria-label={mapOpen
            ? (isFrench ? "Fermer la carte" : "Close the map")
            : (isFrench ? "Ouvrir la carte du parcours" : "Open the journey map")}
          onClick={() => onMapOpenChange(!mapOpen)}
        >
          {mapOpen ? <X size={18} aria-hidden="true" /> : <Map size={18} aria-hidden="true" />}
        </button>
      </div>
      <div className="journey-hud-track" aria-hidden="true">
        <span style={{ "--hud-progress": currentIndex / (STOPS.length - 1) }} />
        <i style={{ left: `${(currentIndex / (STOPS.length - 1)) * 100}%` }}><MapPin size={11} /></i>
      </div>
      <div className="journey-hud-controls" role="group" aria-label={isFrench ? "Commandes de déplacement" : "Movement controls"}>
        <button type="button" disabled={isTraveling} aria-label={isFrench ? "Aller au point précédent" : "Walk to previous point"} onClick={() => onDirection("left")}><ArrowLeft size={16} aria-hidden="true" /></button>
        <button type="button" aria-label={isFrench ? "Ouvrir le point sélectionné" : "Open selected point"} onClick={() => onDirection("down")}><ArrowDown size={16} aria-hidden="true" /></button>
        <button type="button" disabled={isTraveling} aria-label={isFrench ? "Aller au point suivant" : "Walk to next point"} onClick={() => onDirection("right")}><ArrowRight size={16} aria-hidden="true" /></button>
      </div>
      <button
        type="button"
        className="journey-hud-reduce3d"
        aria-label={isFrench ? "Réduire le mode 3D" : "Reduce 3D mode"}
        onClick={() => {
          const currently = localStorage.getItem("portfolio-reduce-3d") === "true";
          localStorage.setItem("portfolio-reduce-3d", String(!currently));
          document.body.classList.toggle("low-power", !currently);
          const button = event.currentTarget;
          button.setAttribute(
            "aria-label",
            !currently
              ? isFrench ? "Rétablir le mode 3D complet" : "Restore full 3D mode"
              : isFrench ? "Réduire le mode 3D" : "Reduce 3D mode"
          );
        }}
      >
        {localStorage.getItem("portfolio-reduce-3d") === "true" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      </button>
      {mapOpen ? (
        <nav id="journey-hud-map" className="journey-hud-map" aria-label={isFrench ? "Destinations" : "Destinations"}>
          {STOPS.map((stop, index) => {
            const isCurrent = stop.id === activeSection;
            return (
              <button
                type="button"
                key={stop.id}
                className={`journey-hud-stop ${isCurrent ? "is-current" : ""}`}
                aria-current={isCurrent ? "location" : undefined}
                onClick={() => {
                  onMapOpenChange(false);
                  onSelectStop(stop.id);
                }}
              >
                <span className="journey-hud-stop-number">{String(index).padStart(2, "0")}</span>
                <span>{LABELS[stop.id][language]}</span>
                {isCurrent ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
              </button>
            );
          })}
          {branchCategory ? (
            <button
              type="button"
              className="journey-hud-return"
              disabled={isTraveling}
              onClick={onReturnToMainRoad}
            >
              <ArrowLeft size={15} aria-hidden="true" />
              {isFrench ? "Retourner à la route principale" : "Return to the main road"}
            </button>
          ) : null}
        </nav>
      ) : null}
    </aside>
  );
}

export default JourneyHUD;
