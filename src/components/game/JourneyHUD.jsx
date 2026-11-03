import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Compass, Map, MapPin, X } from "lucide-react";
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
      <div className="journey-hud-track" aria-hidden="true">
        <span style={{ "--hud-progress": currentIndex / (STOPS.length - 1) }} />
        <i style={{ left: `${(currentIndex / (STOPS.length - 1)) * 100}%` }}><MapPin size={11} /></i>
      </div>
      <div className="journey-hud-controls" role="group" aria-label={isFrench ? "Commandes de déplacement" : "Movement controls"}>
        <button type="button" disabled={isTraveling} aria-label={isFrench ? "Aller au point précédent" : "Walk to previous point"} onClick={() => onDirection("left")}><ArrowLeft size={16} aria-hidden="true" /></button>
        <button type="button" aria-label={isFrench ? "Ouvrir le point sélectionné" : "Open selected point"} onClick={() => onDirection("down")}><ArrowDown size={16} aria-hidden="true" /></button>
        <button type="button" disabled={isTraveling} aria-label={isFrench ? "Aller au point suivant" : "Walk to next point"} onClick={() => onDirection("right")}><ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </aside>
  );
}

export default JourneyHUD;