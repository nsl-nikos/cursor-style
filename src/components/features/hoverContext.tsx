import { useState, useEffect } from "react";

export function useHoverDetection(
  hoverSelector = "a, button, input, textarea, [role='button'], [tabindex]:not([tabindex='-1']), .hoverable"
) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      if (!elemBelow) {
        setIsHovering(false);
        return;
      }

      let matches = false;
      try {
        matches = elemBelow.matches(hoverSelector);
      } catch {
        matches = false;
      }

      setIsHovering(matches);
    }

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [hoverSelector]);

  return isHovering;
}
