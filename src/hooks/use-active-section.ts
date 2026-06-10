"use client";

import { useEffect, useState } from "react";

const sections = ["top", "features", "how-it-works", "pricing"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);

        if (visibleSection) {
          if (visibleSection.target.id === "top") {
            setActiveSection("");
            return;
          }

          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
