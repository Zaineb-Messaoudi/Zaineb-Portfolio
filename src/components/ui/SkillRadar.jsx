import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const SIZE = 340;
const CENTER = SIZE / 2;
const AXIS_RADIUS = 118;
const LABEL_RADIUS = 148;
const RINGS = [0.25, 0.5, 0.75, 1];

function pointAt(index, count, radius) {
  const angle = -Math.PI / 2 + index * ((2 * Math.PI) / count);
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function polygonPoints(count, radius, values) {
  return Array.from({ length: count }, (_, index) => {
    const r = values ? radius * (values[index] / 100) : radius;
    const { x, y } = pointAt(index, count, r);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function SkillRadar({ data, activeIndex, onSelect }) {
  const reduceMotion = useReducedMotion();
  const count = data.length;

  const values = useMemo(() => data.map((item) => item.proficiency), [data]);
  const gridPolygons = useMemo(
    () => RINGS.map((fraction) => polygonPoints(count, AXIS_RADIUS * fraction)),
    [count]
  );
  const dataPolygon = useMemo(() => polygonPoints(count, AXIS_RADIUS, values), [count, values]);

  return (
    <div
      className="skill-radar-chart"
      style={{ position: "relative", width: "100%", maxWidth: 380, margin: "0 auto", aspectRatio: "1 / 1" }}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" role="img" aria-label="Skill proficiency radar chart">
        {gridPolygons.map((points, index) => (
          <polygon key={index} points={points} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} />
        ))}
        {data.map((_, index) => {
          const { x, y } = pointAt(index, count, AXIS_RADIUS);
          return <line key={index} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} />;
        })}
        <motion.polygon
          points={dataPolygon}
          fill="var(--accent-cyan, #68bcb3)"
          fillOpacity={0.22}
          stroke="var(--accent-cyan, #68bcb3)"
          strokeWidth={2}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />
        {data.map((item, index) => {
          const r = AXIS_RADIUS * (item.proficiency / 100);
          const { x, y } = pointAt(index, count, r);
          const isActive = index === activeIndex;
          return (
            <motion.circle
              key={item.title}
              cx={x}
              cy={y}
              r={isActive ? 6 : 4}
              fill={isActive ? "var(--accent-gold, #e2b04a)" : "var(--accent-cyan, #68bcb3)"}
              stroke="var(--bg, #fff)"
              strokeWidth={1.5}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(index)}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.35 + index * 0.05, duration: 0.4 }}
            />
          );
        })}
      </svg>

      {data.map((item, index) => {
        const { x, y } = pointAt(index, count, LABEL_RADIUS);
        const Icon = item.icon;
        const isActive = index === activeIndex;
        return (
          <button
            key={item.title}
            type="button"
            className={`skill-radar-label ${isActive ? "is-active" : ""}`}
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            style={{
              position: "absolute",
              left: `${(x / SIZE) * 100}%`,
              top: `${(y / SIZE) * 100}%`,
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.3rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.35rem",
              color: isActive ? "var(--accent-gold, #e2b04a)" : "inherit",
              opacity: isActive ? 1 : 0.72,
              fontSize: "0.72rem",
              fontWeight: isActive ? 600 : 500,
              textAlign: "center",
              maxWidth: 92,
              lineHeight: 1.15,
              transition: "opacity 0.2s ease, color 0.2s ease",
            }}
          >
            <Icon size={16} />
            <span>{item.title}</span>
          </button>
        );
      })}
    </div>
  );
}

export default SkillRadar;
