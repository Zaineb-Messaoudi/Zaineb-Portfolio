import { useEffect, useState } from "react";

export function useActiveSection(ids) {
  const [activeSection, setActiveSection] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const viewportOffset = window.innerHeight * 0.28;
      let current = elements[0]?.id ?? "";

      for (const element of elements) {
        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportOffset) {
          current = element.id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [ids]);

  return activeSection;
}
