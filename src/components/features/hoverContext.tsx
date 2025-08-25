import { useState, useEffect } from "react";

export function useHoverDetection(magneticPosition?: { x: number; y: number }) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const checkX = magneticPosition?.x ?? event.clientX;
      const checkY = magneticPosition?.y ?? event.clientY;
      
      const elem = document.elementFromPoint(checkX, checkY);
      if (!elem) {
        setIsHovering(false);
        return;
      }
      const isInteractive = elem.matches("a, button, input, textarea, [role='button'], .hoverable");
      setIsHovering(isInteractive);
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [magneticPosition?.x, magneticPosition?.y]);

  return isHovering;
}