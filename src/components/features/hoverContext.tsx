import { useState, useEffect } from "react";

export function useHoverDetection() {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const elem = document.elementFromPoint(event.clientX, event.clientY);
      if (!elem) {
        setIsHovering(false);
        return;
      }
      const isInteractive = elem.matches("a, button, input, textarea, [role='button'], .hoverable");
      setIsHovering(isInteractive);
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return isHovering;
}